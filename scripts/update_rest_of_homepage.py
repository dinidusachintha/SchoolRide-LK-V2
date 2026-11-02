path = r'SchoolRide-LK-V2\apps\web\src\app\page.tsx'

with open(path, 'r', encoding='utf-8') as f:
    c = f.read()

# Replace any remaining VanGo occurrences with SchoolRide LK
c = c.replace('Every driver on VanGo must submit', 'Every driver on SchoolRide LK must submit')
c = c.replace('How are van drivers verified on VanGo?', 'How are van drivers verified on SchoolRide LK?')

# Update Safety Heading
target_safety = '<h2 className="text-3xl sm:text-4xl font-extrabold text-[#0B2C22] dark:text-white tracking-tight">\n                Trust earned through rigorous inspection.\n              </h2>'
repl_safety = '<h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#0B2C22] dark:text-white tracking-tight">\n                Trust earned through <span className="text-[#8CB02C]">rigorous inspection</span>.\n              </h2>'

# Update Routes Heading
target_routes = '<h2 className="text-3xl sm:text-4xl font-extrabold text-[#0B2C22] dark:text-white tracking-tight">\n              School Routes &amp; Pickup Areas\n            </h2>'
repl_routes = '<h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#0B2C22] dark:text-white tracking-tight">\n              School Routes &amp; <span className="text-[#8CB02C]">Coverage Areas</span>\n            </h2>'

# Update FAQ Heading
target_faq = '<h2 className="text-3xl sm:text-4xl font-extrabold text-[#0B2C22] dark:text-white tracking-tight">\n              Frequently Asked Questions\n            </h2>'
repl_faq = '<h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#0B2C22] dark:text-white tracking-tight">\n              Frequently Asked <span className="text-[#8CB02C]">Questions</span>\n            </h2>'

# Update CTA Heading
target_cta = '<h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight leading-tight">\n            Ready to find safe school transportation?\n          </h2>'
repl_cta = '<h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight leading-tight">\n            Ready to find safe school transportation for <span className="text-[#E3D13E]">your children</span>?\n          </h2>'

for t, r in [(target_safety, repl_safety), (target_routes, repl_routes), (target_faq, repl_faq), (target_cta, repl_cta)]:
    t_norm = t.replace('\r\n', '\n')
    r_norm = r.replace('\r\n', '\n')
    c_norm = c.replace('\r\n', '\n')
    if t_norm in c_norm:
        c = c_norm.replace(t_norm, r_norm, 1)
        print('Replaced heading successfully!')
    else:
        print('Heading target not found, trying partial match...')

with open(path, 'w', encoding='utf-8') as f:
    f.write(c)

print('Finished updating rest of homepage!')
