page_path = r'SchoolRide-LK-V2/apps/web/src/app/page.tsx'

with open(page_path, 'r', encoding='utf-8') as f:
    content = f.read()

s4_start_marker = '{/* ======================================================== */}\n      {/* 4. HOW IT WORKS'
s5_start_marker = '{/* ======================================================== */}\n      {/* 5. CHILD SAFETY'

idx1 = content.find(s4_start_marker)
idx2 = content.find(s5_start_marker)

if idx1 == -1 or idx2 == -1:
    print('Failed to find section markers!')
    exit(1)

new_section_4 = '''{/* ======================================================== */}
      {/* 4. HOW TO REQUEST A RIDE (MATCHING 2ND IMAGE TEMPLATE)   */}
      {/* ======================================================== */}
      <section id="how-it-works" className="py-16 sm:py-20 lg:py-24 bg-black text-white border-b border-slate-900 overflow-hidden">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
          <HowItWorksSlideshow />
        </div>
      </section>

      '''

new_content = content[:idx1] + new_section_4 + content[idx2:]

with open(page_path, 'w', encoding='utf-8') as f:
    f.write(new_content)

print('Section 4 updated successfully in page.tsx!')

