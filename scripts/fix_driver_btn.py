path = r'SchoolRide-LK-V2\apps\web\src\app\drivers\page.tsx'
with open(path, 'r', encoding='utf-8') as f:
    c = f.read()

target = """                  <Link href={`/drivers/${driver.id}`}>
                    <Button variant="primary" size="sm" className="shadow-subtle">
                      View Profile <ArrowRight className="h-3.5 w-3.5 ml-1" />
                    </Button>
                  </Link>"""

repl = """                  <Link href={`/drivers/${driver.id}`}>
                    <button className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#094718] hover:bg-[#073713] text-white font-bold text-xs shadow-sm transition-all cursor-pointer">
                      <span>View Profile</span>
                      <ArrowRight className="h-3.5 w-3.5" />
                    </button>
                  </Link>"""

if target in c:
    c = c.replace(target, repl, 1)
    with open(path, 'w', encoding='utf-8') as f:
        f.write(c)
    print('Updated button successfully!')
else:
    print('Target not found')
