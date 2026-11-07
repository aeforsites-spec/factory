# موقع المصنع — دليل التعديل والنشر
# Factory website — editing & publishing guide

موقع ثابت (HTML/CSS/JS) بدون أي برامج إضافية. العربي هو اللغة الافتراضية، وزر **English** أعلى الصفحة يبدّل اللغة.

## الصفحات
| الملف | الصفحة |
|---|---|
| `index.html` | الرئيسية: الأقسام + منتجات مميزة + لماذا نحن |
| `products.html` | كل المنتجات + بحث + فلترة بالقسم |
| `product.html?id=BM-101` | صفحة المنتج: الصور، الوصف، المواصفات، أزرار واتساب/ماسنجر |
| `about.html` | من نحن |
| `contact.html` | تواصل معنا |

## الملفات التي تعدّلها فقط
1. **`data/config.js`**: اسم المصنع، رقم الواتساب، رابط الفيسبوك والماسنجر، الهاتف، العنوان، نص "من نحن".
2. **`data/products.js`**: الأقسام والمنتجات.
3. **`images/products/<الكود>/`**: صور كل منتج.

لا تحتاج تعديل `js/app.js` أو `css/style.css`. الألوان موجودة في أول `css/style.css` لو حبيت تغيّرها.

## إضافة منتج
1. اعمل فولدر باسم الكود: `images/products/BM-103/` وحط فيه الصور `1.jpg`, `2.jpg` ...
2. في `data/products.js` انسخ منتج كامل من `{` إلى `},` والصقه، وغيّر:
   `code`, `category`, `name`, `description`, `specs`, `images`.
3. احفظ وحدّث الصفحة.

> نصيحة: صغّر حجم الصور قبل الرفع (عرض 1200–1600 بكسل، أقل من 300 كيلوبايت) عشان الموقع يفتح بسرعة على الموبايل.

## زر الواتساب: إيه اللي بيوصلك؟
لما الزبون يضغط **"أريد هذا المنتج"** يفتح الواتساب برسالة جاهزة فيها:
```
السلام عليكم، أريد الاستفسار عن هذا المنتج:
• المنتج: ماكينة بلوك هيدروليك أوتوماتيك
• الكود: BM-101
• كود الصورة: BM-101-2     ← الصورة اللي كان بيتفرج عليها
• الرابط: https://.../product.html?id=BM-101&img=2
```
الرابط بيفتح نفس الصورة بالظبط. زر **ماسنجر** ينسخ نفس الرسالة، والزبون يلصقها في المحادثة (الماسنجر مايسمحش بكتابة الرسالة تلقائياً).

## التجربة على جهازك
افتح `index.html` مباشرة بالضغط عليه مرتين، أو شغّل:
```
powershell -ExecutionPolicy Bypass -File tools\serve.ps1
```
وافتح http://localhost:8080

## النشر مجاناً على GitHub Pages
1. اعمل حساب على https://github.com
2. اضغط **New repository**، سمّيه مثلاً `factory`، واختار **Public**، ثم **Create**.
3. اضغط **uploading an existing file** واسحب **كل محتويات** فولدر `factory-website` (وليس الفولدر نفسه)، ثم **Commit changes**.
4. من **Settings ← Pages**: اختار **Deploy from a branch**، والفرع `main`، والفولدر `/ (root)`، ثم **Save**.
5. بعد دقيقة أو اثنتين يكون الموقع على:
   `https://<اسم-حسابك>.github.io/factory/`

للتحديث بعد كده: ارفع الملفات المعدّلة بنفس الطريقة وهي هتستبدل القديمة.
ولو حبيت دومين خاص (مثل `www.yourfactory.com`) تقدر تربطه من نفس صفحة Pages.

---

### English summary
- Edit only `data/config.js` (contact info, texts) and `data/products.js` (products), and put photos in `images/products/<CODE>/`.
- Each photo gets an automatic code `<CODE>-<n>`. The WhatsApp button sends product name, code, photo code and a direct link to that photo.
- Host free on GitHub Pages (public repo → Settings → Pages → main / root).

## إضافة صور كثيرة مرة واحدة (أداة الاستيراد)
1. ضع كل الصور في فولدر واحد (مثلاً `F:\site`).
2. في `tools/photo-map.txt` اكتب كود كل منتج وأرقام صوره (ترتيب الصور حسب اسم الملف):
   `BM-01: 17, 90, 91`
3. شغّل:
```
powershell -ExecutionPolicy Bypass -File tools\import-photos.ps1 -Source "F:\site"
```
الأداة تنسخ الصور إلى `images/products/<الكود>/1.jpg, 2.jpg ...` وتصغّر الكبير منها.
