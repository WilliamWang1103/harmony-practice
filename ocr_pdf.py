#!/usr/bin/env python3
"""PDF OCR 工具：从扫描版 PDF 提取内嵌图片并 OCR（中文+英文）。
不依赖 poppler，直接用 pypdf 提取页面内嵌图片。
用法: python3 ocr_pdf.py <pdf路径> [输出txt路径]
"""
import sys
import os
from io import BytesIO
from pypdf import PdfReader
import pytesseract
from PIL import Image

def ocr_pdf(pdf_path, output_path=None):
    if output_path is None:
        base = os.path.splitext(pdf_path)[0]
        output_path = base + '_OCR.txt'

    print(f'[OCR] 读取: {pdf_path}')
    reader = PdfReader(pdf_path)
    total = len(reader.pages)
    print(f'[OCR] 共 {total} 页')

    all_text = []
    for i, page in enumerate(reader.pages, 1):
        print(f'  处理第 {i}/{total} 页...')
        images = list(page.images)
        if not images:
            all_text.append(f'===== 第 {i} 页 =====\n（无内嵌图片）')
            continue
        # 每页可能有多张图，依次 OCR
        for img in images:
            try:
                pil_img = Image.open(BytesIO(img.data))
                if pil_img.mode != 'RGB':
                    pil_img = pil_img.convert('RGB')
                text = pytesseract.image_to_string(pil_img, lang='chi_sim+eng')
                all_text.append(f'===== 第 {i} 页 =====\n{text}')
            except Exception as e:
                all_text.append(f'===== 第 {i} 页 =====\n[图片处理失败: {e}]')

    result = '\n'.join(all_text)
    with open(output_path, 'w', encoding='utf-8') as f:
        f.write(result)
    print(f'[OCR] 完成，输出: {output_path}')
    return result

if __name__ == '__main__':
    if len(sys.argv) < 2:
        print('用法: python3 ocr_pdf.py <pdf路径> [输出txt路径]')
        sys.exit(1)
    pdf = sys.argv[1]
    out = sys.argv[2] if len(sys.argv) > 2 else None
    ocr_pdf(pdf, out)
