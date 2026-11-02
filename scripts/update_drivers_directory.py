path = r'SchoolRide-LK-V2\apps\web\src\app\drivers\page.tsx'

with open(path, 'r', encoding='utf-8') as f:
    c = f.read()

# Replace header banner
target_header = '''      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-border/80 pb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight">
              Verified School Van Drivers
            </h1>
            <Badge variant="success">
              <ShieldCheck className="h-3.5 w-3.5 mr-1" /> Verified Only
            </Badge>
          </div>
          <p className="text-xs sm:text-sm text-muted-foreground">
            Search licensed, background-checked school transport operators across Sri Lanka
          </p>
        </div>'''

repl_header = '''      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-emerald-100/60 dark:border-slate-800 pb-6">
        <div className="space-y-1">
          <div className="flex flex-wrap items-center gap-2.5 mb-1">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-[#0B2C22] dark:text-white tracking-tight">
              Verified <span className="text-[#8CB02C]">School Van Drivers</span>
            </h1>
            <span className="px-3 py-1 rounded-full bg-[#EBF7EE] text-[#0B4626] border border-[#BCE6C9] text-xs font-bold uppercase tracking-wider inline-flex items-center gap-1.5 shadow-sm">
              <ShieldCheck className="h-3.5 w-3.5 text-[#16A34A]" /> Verified Only
            </span>
          </div>
          <p className="text-xs sm:text-sm text-[#4E6258] dark:text-slate-300">
            Search licensed, background-checked school transport operators across Colombo, Kandy, Gampaha, Galle &amp; all Sri Lankan districts.
          </p>
        </div>'''

# Replace Card styling
target_card = '''              <Card
                key={driver.id}
                className="overflow-hidden hover:border-primary/40 hover:shadow-floating transition-all flex flex-col justify-between"
              >'''

repl_card = '''              <div
                key={driver.id}
                className="overflow-hidden rounded-[24px] border border-emerald-950/[0.08] dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-emerald-300/80 hover:shadow-[0_12px_28px_rgba(9,71,24,0.08)] hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between shadow-[0_4px_20px_rgba(0,0,0,0.03)]"
              >'''

target_close_card = '</Card>'
repl_close_card = '</div>'

target_avatar = '''                      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary font-bold text-base border border-primary/20 shrink-0">'''
repl_avatar = '''                      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#EAF6ED] text-[#094718] font-black text-base border border-[#CDE9D3] shrink-0 shadow-sm">'''

target_footer = '''                {/* Footer with Price and View Button */}
                <div className="px-6 py-4 border-t border-border/60 bg-muted/10 flex items-center justify-between">'''
repl_footer = '''                {/* Footer with Price and View Button */}
                <div className="px-6 py-4 border-t border-slate-100 dark:border-slate-800 bg-[#FAFDF9] dark:bg-slate-900/60 flex items-center justify-between">'''

target_btn = '''                    <Link href={`/drivers/${driver.id}`}>
                    <Button variant="primary" size="sm" className="shadow-subtle">
                      View Profile <ArrowRight className="h-3.5 w-3.5 ml-1" />
                    </Button>
                  </Link>'''
repl_btn = '''                    <Link href={`/drivers/${driver.id}`}>
                    <button className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full bg-[#094718] hover:bg-[#073713] text-white font-bold text-xs shadow-sm transition-all cursor-pointer">
                      <span>View Profile</span>
                      <ArrowRight className="h-3.5 w-3.5" />
                    </button>
                  </Link>'''

for t, r in [
    (target_header, repl_header),
    (target_card, repl_card),
    (target_avatar, repl_avatar),
    (target_footer, repl_footer),
    (target_btn, repl_btn),
]:
    t_norm = t.replace('\r\n', '\n')
    r_norm = r.replace('\r\n', '\n')
    c_norm = c.replace('\r\n', '\n')
    if t_norm in c_norm:
        c = c_norm.replace(t_norm, r_norm, 1)
        print('Applied drivers directory replacement!')
    else:
        print('Pattern not found, skipping...')

# replace </Card> if Card was changed
if 'className="overflow-hidden rounded-[24px]' in c:
    c = c.replace('            );\n          })}\n        </div>\n      )}\n    </div>\n  );\n}', '            );\n          })}\n        </div>\n      )}\n    </div>\n  );\n}')
    # replace </Card>
    c = c.replace('              </Card>\n            );', '              </div>\n            );')

with open(path, 'w', encoding='utf-8') as f:
    f.write(c)

print('Updated drivers directory page!')
