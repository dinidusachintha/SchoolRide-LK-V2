with open(r'C:\Users\user\Desktop\Project\SchoolRide-LK-V2\apps\web\src\app\page.tsx', 'r', encoding='utf-8') as f:
    text = f.read()

text = text.replace("import { motion, AnimatePresence } from 'framer-motion';", "import { motion, AnimatePresence, type Variants } from 'framer-motion';")

text = text.replace("const containerVariants = {", "const containerVariants: Variants = {")
text = text.replace("const itemVariants = {", "const itemVariants: Variants = {")
text = text.replace("const badgeVariants = {", "const badgeVariants: Variants = {")
text = text.replace("const visualVariants = {", "const visualVariants: Variants = {")
text = text.replace("const floatingCardVariants = {", "const floatingCardVariants: Variants = {")
text = text.replace("type: 'spring',", "type: 'spring' as const,")

with open(r'C:\Users\user\Desktop\Project\SchoolRide-LK-V2\apps\web\src\app\page.tsx', 'w', encoding='utf-8') as f:
    f.write(text)

print('Updated page.tsx with typed Variants!')

