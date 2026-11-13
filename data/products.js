/* =====================================================================
   الأقسام والمنتجات  —  CATEGORIES & PRODUCTS
   ---------------------------------------------------------------------
   لإضافة منتج جديد: انسخ أي منتج من أول { إلى آخر }, والصقه، وغيّر بياناته.
   To add a product: copy one product block { ... }, paste it, edit it.

   - code      : كود المنتج (لازم يكون مختلف لكل منتج) — يصلك في رسالة الواتساب
   - category  : اسم القسم من قائمة CATEGORIES
   - featured  : true = يظهر في الصفحة الرئيسية
   - images    : مسارات الصور — images/products/<الكود>/1.jpg , 2.jpg ...
                 كل صورة لها كود تلقائي: BM-01-1 , BM-01-2 ...
   - specs     : جدول المواصفات [ "اسم الخاصية", "القيمة" ] (اختياري)
   ===================================================================== */

window.CATEGORIES = [
  { id: "mobile",     ar: "ماكينات بلوك متحركة (بياضة)", en: "Mobile Block Machines" },
  { id: "stationary", ar: "ماكينات بلوك ثابتة",          en: "Stationary Block Machines" },
  { id: "press",      ar: "مكابس هزازة يدوية",           en: "Manual Vibrating Presses" },
  { id: "mixer",      ar: "خلاطات",                      en: "Mixers" },
  { id: "molds",      ar: "اسطمبات",                     en: "Molds" },
  { id: "carts",      ar: "عربات ومعدات نقل",            en: "Carts & Handling" },
  { id: "sets",       ar: "مجموعات إنتاج كاملة",         en: "Complete Sets" },
  { id: "steel",      ar: "استنباط حديد حسب الطلب",      en: "Custom Steel Fabrication" }
];

/* helper: builds ["images/products/CODE/1.jpg", ...] */
function photos(code, count) {
  var list = [];
  for (var i = 1; i <= count; i++) list.push("images/products/" + code + "/" + i + ".jpg");
  return list;
}

var ASK = {
  ar: [["السعر والمواصفات", "تواصل معنا على الواتساب"], ["التصنيع", "داخل مصنعنا — ويمكن التعديل حسب الطلب"]],
  en: [["Price & specs", "Contact us on WhatsApp"], ["Manufacturing", "Built in our workshop — custom changes available"]]
};

window.PRODUCTS = [
  /* ---------------- ماكينات بلوك متحركة ---------------- */
  {
    code: "BM-01",
    category: "mobile",
    featured: true,
    name: { ar: "ماكينة بلوك متحركة كبيرة بموتور هزاز", en: "Large Mobile Block Machine with Vibration Motor" },
    description: {
      ar: "ماكينة بلوك متحركة (بياضة) بعرض كبير، بتصب البلوك على الأرض مباشرة وتتحرك لصف جديد. مزودة بموتور هزاز كهرباء، وطارة دركسيون للرفع، واسطمبة متعددة العيون لإنتاج عدد كبير من البلوك في كل صبة.",
      en: "Wide mobile (egg-laying) block machine that casts blocks directly on the floor and moves on to the next row. Electric vibration motor, hand-wheel lifting and a multi-cavity mold for a high number of blocks per cycle."
    },
    specs: {
      ar: [["التشغيل", "موتور هزاز كهرباء"], ["الرفع", "طارة دركسيون وجنزير"]].concat(ASK.ar),
      en: [["Power", "Electric vibration motor"], ["Lifting", "Hand wheel & chain"]].concat(ASK.en)
    },
    images: photos("BM-01", 6)
  },
  {
    code: "BM-02",
    category: "mobile",
    featured: true,
    name: { ar: "ماكينة بلوك متحركة بطارة دركسيون وجنزير", en: "Mobile Block Machine with Hand Wheel & Chain Lift" },
    description: {
      ar: "ماكينة بلوك متحركة بشاسيه حديد قوي، رفع الاسطمبة بطارة دركسيون وجنزير، وضغط البلوك بذراع يدوي. مناسبة لإنتاج البلوك المفرغ والمصمت بمقاسات مختلفة حسب الاسطمبة.",
      en: "Mobile block machine on a heavy steel chassis. The mold is raised with a hand wheel and chain, and blocks are pressed with a manual lever. Produces hollow or solid blocks depending on the mold."
    },
    specs: { ar: [["الرفع", "طارة دركسيون وجنزير"]].concat(ASK.ar), en: [["Lifting", "Hand wheel & chain"]].concat(ASK.en) },
    images: photos("BM-02", 10)
  },
  {
    code: "BM-03",
    category: "mobile",
    featured: false,
    name: { ar: "ماكينة بلوك متحركة بشاسيه طويل وذراع جر", en: "Mobile Block Machine with Long Frame & Pull Handle" },
    description: {
      ar: "ماكينة بلوك متحركة بشاسيه طويل وذراع علوي لتحريك الماكينة ورفع الاسطمبة بسهولة، مع صندوق تغذية للخلطة.",
      en: "Mobile block machine with an extended frame and an overhead handle for moving the machine and lifting the mold easily, with a feed box for the mix."
    },
    specs: ASK,
    images: photos("BM-03", 5)
  },
  {
    code: "BM-04",
    category: "mobile",
    featured: false,
    name: { ar: "ماكينة بلوك متحركة بذراع تحميل", en: "Mobile Block Machine with Loading Arm" },
    description: {
      ar: "ماكينة بلوك متحركة بعجل، مزودة بذراع تحميل كبير لرفع الاسطمبة وضغط البلوك، وطاولة تغذية أمامية.",
      en: "Wheeled mobile block machine with a large loading arm for lifting the mold and pressing the blocks, and a front feed table."
    },
    specs: ASK,
    images: photos("BM-04", 5)
  },
  {
    code: "BM-05",
    category: "mobile",
    featured: false,
    name: { ar: "ماكينة بلوك صغيرة متحركة (يد صفراء)", en: "Small Mobile Block Machine (Yellow Handle)" },
    description: {
      ar: "ماكينة بلوك صغيرة متحركة على عجل، اسطمبة بأكثر من عين، ويد علوية لرفع الاسطمبة. اقتصادية ومناسبة للمشاريع الصغيرة وبداية المصنع.",
      en: "Small wheeled mobile block machine with a multi-cavity mold and an overhead handle for lifting the mold. Economical and ideal for small projects and new block yards."
    },
    specs: ASK,
    images: photos("BM-05", 6)
  },
  {
    code: "BM-06",
    category: "mobile",
    featured: true,
    name: { ar: "ماكينة بلوك صغيرة متحركة (يد سوداء)", en: "Small Mobile Block Machine (Black Handle)" },
    description: {
      ar: "ماكينة بلوك صغيرة متحركة بيد علوية سوداء لرفع الاسطمبة، خفيفة وسهلة النقل في عربية نصف نقل.",
      en: "Small mobile block machine with a black overhead handle for lifting the mold. Light and easy to transport in a pickup truck."
    },
    specs: ASK,
    images: photos("BM-06", 9)
  },
  {
    code: "BM-07",
    category: "mobile",
    featured: false,
    name: { ar: "ماكينة بلوك صغيرة بموتور بنزين", en: "Small Block Machine with Petrol Engine" },
    description: {
      ar: "ماكينة بلوك صغيرة متحركة تعمل بموتور بنزين، مناسبة للمواقع التي لا يوجد بها كهرباء.",
      en: "Small mobile block machine powered by a petrol engine — ideal for sites without electricity."
    },
    specs: {
      ar: [["التشغيل", "موتور بنزين"]].concat(ASK.ar),
      en: [["Power", "Petrol engine"]].concat(ASK.en)
    },
    images: photos("BM-07", 1)
  },

  {
    code: "BM-10",
    category: "mobile",
    featured: true,
    name: { ar: "ماكينة بلوك متحركة بموتور هزاز ولوحة تشغيل", en: "Mobile Block Machine with Vibrator & Switch Box" },
    description: {
      ar: "موديل حديث من ماكينات البلوك المتحركة: شاسيه قوي على عجل، يد علوية لرفع الاسطمبة، طارة دركسيون وجنزير، موتور هزاز كهرباء مع لوحة تشغيل (مفتاح) على الماكينة، وصينية خروج للبلوك. متاحة بأكثر من لون وأكثر من مقاس اسطمبة.",
      en: "Our newer mobile block machine: heavy chassis on wheels, overhead handle for lifting the mold, hand wheel and chain, electric vibration motor with an on-machine switch box, and a block outlet tray. Available in different colours and mold sizes."
    },
    specs: {
      ar: [["التشغيل", "موتور هزاز كهرباء + مفتاح تشغيل"], ["الرفع", "طارة دركسيون وجنزير"]].concat(ASK.ar),
      en: [["Power", "Electric vibration motor + switch"], ["Lifting", "Hand wheel & chain"]].concat(ASK.en)
    },
    images: photos("BM-10", 15)
  },
  {
    code: "BM-11",
    category: "mobile",
    featured: true,
    name: { ar: "ماكينة طوب طراز إنجليزي", en: "English-Type Brick Machine" },
    description: {
      ar: "ماكينة طوب طراز إنجليزي كبيرة على عجل حديد، بطارة توجيه لتحريك الماكينة بين الصفوف، وذراع تحميل طويل، وصندوق تغذية، وموتور هزاز. مناسبة للإنتاج الكبير في الأحواش والمواقع المفتوحة. في الصور كمان مراحل تصنيعها عندنا: من الشاسيه الخام لحد الدهان والتجميع.",
      en: "Large English-type brick machine on steel wheels, with a steering wheel for moving between rows, a long loading arm, a feed box and a vibration motor. Built for high output in open yards and sites. The photos also show how we build it: from the raw chassis to painting and assembly."
    },
    specs: {
      ar: [["التحريك", "طارة توجيه"], ["التشغيل", "موتور هزاز كهرباء"]].concat(ASK.ar),
      en: [["Movement", "Steering wheel"], ["Power", "Electric vibration motor"]].concat(ASK.en)
    },
    images: photos("BM-11", 21)
  },

  /* ---------------- ماكينات بلوك ثابتة ---------------- */
  {
    code: "BM-08",
    category: "stationary",
    featured: false,
    name: { ar: "ماكينة بلوك ثابتة على حامل", en: "Stationary Block Machine on Stand" },
    description: {
      ar: "ماكينة بلوك ثابتة مركبة على حامل (ترابيزة) بارتفاع مناسب للعامل، يخرج البلوك على بالتة. مناسبة للإنتاج داخل الورشة.",
      en: "Stationary block machine mounted on a stand at a comfortable working height; blocks come out on a pallet. Suitable for production inside a workshop."
    },
    specs: ASK,
    images: photos("BM-08", 3)
  },
  {
    code: "BM-09",
    category: "stationary",
    featured: false,
    name: { ar: "ماكينة بلوك ثابتة بذراع ضغط جانبي", en: "Stationary Block Machine with Side Press Lever" },
    description: {
      ar: "ماكينة بلوك ثابتة على حامل، بذراع ضغط جانبي وصندوق تغذية متحرك، والبلوك يخرج على بالتة.",
      en: "Stationary block machine on a stand with a side press lever and a sliding feed box; blocks come out on a pallet."
    },
    specs: ASK,
    images: photos("BM-09", 3)
  },

  /* ---------------- مكابس هزازة ---------------- */
  {
    code: "PR-01",
    category: "press",
    featured: false,
    name: { ar: "مكبس هزاز يدوي بموتور", en: "Manual Vibrating Press with Motor" },
    description: {
      ar: "مكبس يدوي بذراع ضغط وموتور هزاز أسفل الطاولة، لإنتاج الطوب والإنترلوك والبلاط بجودة عالية وكثافة ممتازة.",
      en: "Manual lever press with a vibration motor under the table, for producing bricks, interlock pavers and tiles with excellent density."
    },
    specs: ASK,
    images: photos("PR-01", 4)
  },
  {
    code: "PR-02",
    category: "press",
    featured: true,
    name: { ar: "مكبس هزاز بصندوق موتور ورافعة", en: "Vibrating Press with Motor Box & Lever" },
    description: {
      ar: "مكبس هزاز بجسم صندوق مقفول للموتور، واسطمبة علوية بغطاء ضغط، وذراع رافعة طويل لإخراج المنتج بسهولة.",
      en: "Vibrating press with an enclosed motor box, top mold with press cover, and a long lever for easy demolding."
    },
    specs: ASK,
    images: photos("PR-02", 4)
  },

  /* ---------------- خلاطات ---------------- */
  {
    code: "MX-01",
    category: "mixer",
    featured: true,
    name: { ar: "خلاطة بان بطارة وسير", en: "Pan Mixer with Belt Pulley" },
    description: {
      ar: "خلاطة بان (حلّة) بموتور كهرباء ونقل حركة بطارة وسير، مع باب تفريغ جانبي. لخلط خلطة البلوك والإنترلوك بشكل متجانس.",
      en: "Pan mixer driven by an electric motor through a belt and pulley, with a side discharge door. Gives a uniform mix for blocks and pavers."
    },
    specs: {
      ar: [["نقل الحركة", "طارة وسير"], ["التفريغ", "باب جانبي"]].concat(ASK.ar),
      en: [["Drive", "Belt & pulley"], ["Discharge", "Side door"]].concat(ASK.en)
    },
    images: photos("MX-01", 9)
  },
  {
    code: "MX-02",
    category: "mixer",
    featured: false,
    name: { ar: "خلاطة بان بجيربوكس", en: "Pan Mixer with Gearbox" },
    description: {
      ar: "خلاطة بان بموتور كهرباء وجيربوكس (علبة تروس) لعزم أقوى وتشغيل أهدأ، بأذرع خلط من الداخل وباب تفريغ.",
      en: "Pan mixer with electric motor and gearbox for higher torque and smoother running, with internal mixing arms and a discharge door."
    },
    specs: {
      ar: [["نقل الحركة", "جيربوكس"]].concat(ASK.ar),
      en: [["Drive", "Gearbox"]].concat(ASK.en)
    },
    images: photos("MX-02", 5)
  },
  {
    code: "MX-03",
    category: "mixer",
    featured: false,
    name: { ar: "خلاطة بقادوس تفريغ سفلي وغطاء", en: "Mixer with Bottom Discharge Hopper & Lid" },
    description: {
      ar: "خلاطة بغطاء علوي وقادوس (قمع) تفريغ من أسفل، لتفريغ الخلطة مباشرة في العربة أو الماكينة.",
      en: "Mixer with a top lid and a cone hopper underneath, so the mix drops straight into the cart or machine."
    },
    specs: ASK,
    images: photos("MX-03", 1)
  },
  {
    code: "MX-04",
    category: "mixer",
    featured: true,
    name: { ar: "خلاطة بغطاء شبك وموتور سفلي", en: "Mixer with Mesh Guard & Under-Mounted Motor" },
    description: {
      ar: "خلاطة بان بغطاء شبك حماية من أعلى، والموتور والجيربوكس مركبين تحت الخلاطة، على أرجل بعجل لسهولة التحريك. متاحة بأكثر من لون.",
      en: "Pan mixer with a protective mesh guard on top, motor and gearbox mounted underneath, on legs with castor wheels for easy moving. Available in different colours."
    },
    specs: {
      ar: [["الحماية", "غطاء شبك"], ["الموتور", "أسفل الخلاطة"]].concat(ASK.ar),
      en: [["Safety", "Mesh guard"], ["Motor", "Under the pan"]].concat(ASK.en)
    },
    images: photos("MX-04", 7)
  },
  {
    code: "MX-05",
    category: "mixer",
    featured: false,
    name: { ar: "خلاطة بان بغطاء حماية للسير", en: "Pan Mixer with Belt Guard" },
    description: {
      ar: "خلاطة بان بموتور وسير، مع غطاء حماية كامل فوق السير والطارة لأمان العامل، وباب تفريغ جانبي.",
      en: "Belt-driven pan mixer with a full guard over the belt and pulley for operator safety, and a side discharge door."
    },
    specs: ASK,
    images: photos("MX-05", 3)
  },

  /* ---------------- اسطمبات ---------------- */
  {
    code: "MD-01",
    category: "molds",
    featured: false,
    name: { ar: "اسطمبة بلوك مفرغ مع الرأس (الدقاق)", en: "Hollow Block Mold with Tamper Head" },
    description: {
      ar: "اسطمبة بلوك مفرغ متعددة العيون مع الرأس العلوي (الدقاق) المطابق لها، مصنعة من صاج قوي ومقطعة بدقة.",
      en: "Multi-cavity hollow block mold with its matching tamper head, made of heavy steel plate and precisely cut."
    },
    specs: ASK,
    images: photos("MD-01", 5)
  },
  {
    code: "MD-02",
    category: "molds",
    featured: false,
    name: { ar: "اسطمبات بلوك بمقاسات مختلفة", en: "Block Molds in Various Sizes" },
    description: {
      ar: "اسطمبات بلوك مفرغ ومصمت بمقاسات وعدد عيون مختلف، ونصنع أي مقاس حسب الطلب ولأي ماكينة.",
      en: "Hollow and solid block molds in different sizes and cavity counts. Any size made to order, for any machine."
    },
    specs: ASK,
    images: photos("MD-02", 20)
  },
  {
    code: "MD-03",
    category: "molds",
    featured: false,
    name: { ar: "اسطمبة إنترلوك سداسي", en: "Hexagonal Interlock Paver Mold" },
    description: {
      ar: "اسطمبة إنترلوك بشكل سداسي متعددة العيون مع الدقاق المطابق، لإنتاج بلاط الأرصفة والممرات.",
      en: "Multi-cavity hexagonal interlock paver mold with matching tamper heads, for sidewalk and walkway pavers."
    },
    specs: ASK,
    images: photos("MD-03", 3)
  },
  {
    code: "MD-04",
    category: "molds",
    featured: false,
    name: { ar: "اسطمبة طوب مخرم متعددة العيون", en: "Perforated Brick Mold, Multi-Cavity" },
    description: {
      ar: "اسطمبة لإنتاج الطوب المخرم بعدد عيون كبير في الصبة الواحدة.",
      en: "Mold for perforated bricks with a large number of cavities per cycle."
    },
    specs: ASK,
    images: photos("MD-04", 4)
  },
  {
    code: "MD-05",
    category: "molds",
    featured: false,
    name: { ar: "اسطمبة بلوك كبيرة لماكينة متحركة", en: "Large Block Mold for Mobile Machines" },
    description: {
      ar: "اسطمبة بلوك كبيرة متعددة العيون بقاعدة تغذية أمامية، بتتركب على ماكينات البلوك المتحركة. مصنعة من صاج قوي، ومقاس وعدد العيون حسب الطلب.",
      en: "Large multi-cavity block mold with a front feed tray, fitted to mobile block machines. Made of heavy steel plate; cavity size and count to order."
    },
    specs: ASK,
    images: photos("MD-05", 4)
  },
  {
    code: "MD-06",
    category: "molds",
    featured: false,
    name: { ar: "اسطمبة إنترلوك (شكل عضمة)", en: "Interlock Paver Mold (Bone Shape)" },
    description: {
      ar: "اسطمبة إنترلوك متعددة العيون بالشكل المتعرج (العضمة) المنتشر في الأرصفة والجراجات، مقطعة بدقة ومجمعة بلحام قوي.",
      en: "Multi-cavity interlock paver mold in the popular wavy 'bone' shape used for sidewalks and parking areas, precisely cut and strongly welded."
    },
    specs: ASK,
    images: photos("MD-06", 1)
  },
  {
    code: "MD-07",
    category: "molds",
    featured: false,
    name: { ar: "اسطمبات بأشكال خاصة حسب الطلب", en: "Custom-Shape Molds to Order" },
    description: {
      ar: "بنصنع اسطمبات بأي شكل أو مقاس يطلبه العميل، زي الاسطمبة نصف الدائرية دي. ابعتلنا الشكل والمقاس واحنا ننفذه.",
      en: "We make molds in any shape or size the customer needs, like this half-round mold. Send us the shape and size and we'll build it."
    },
    specs: ASK,
    images: photos("MD-07", 1)
  },

  /* ---------------- عربات ---------------- */
  {
    code: "CT-01",
    category: "carts",
    featured: false,
    name: { ar: "عربة قلاب لتغذية الماكينة", en: "Tipping Feed Cart" },
    description: {
      ar: "عربة بقلاب لنقل الخلطة من الخلاطة وتفريغها في صندوق الماكينة بسهولة، بعجل كاوتش.",
      en: "Tipping cart for carrying the mix from the mixer and emptying it into the machine's feed box, on rubber wheels."
    },
    specs: ASK,
    images: photos("CT-01", 8)
  },
  {
    code: "CT-02",
    category: "carts",
    featured: false,
    name: { ar: "عربة صينية لنقل الخلطة", en: "Tray Cart for Mix" },
    description: {
      ar: "عربة بصينية مفتوحة وذراعين طوال، لنقل الخلطة وتغذية الماكينة.",
      en: "Open-tray cart with long handles for carrying the mix and feeding the machine."
    },
    specs: ASK,
    images: photos("CT-02", 3)
  },
  {
    code: "CT-03",
    category: "carts",
    featured: false,
    name: { ar: "عربة يد بصندوق (ترولي)", en: "Two-Wheel Box Trolley" },
    description: {
      ar: "عربة يد بعجلتين وصندوق حديد، لنقل الأسمنت والرمل والخامات داخل الموقع.",
      en: "Two-wheel hand trolley with a steel box for moving cement, sand and materials around the site."
    },
    specs: ASK,
    images: photos("CT-03", 3)
  },
  {
    code: "CT-04",
    category: "carts",
    featured: false,
    name: { ar: "عربة كارو (بركة) لنقل المونة", en: "Concrete Wheelbarrow" },
    description: {
      ar: "عربة كارو (بركة) من صاج قوي لنقل المونة والخرسانة.",
      en: "Heavy steel-plate wheelbarrow for carrying mortar and concrete."
    },
    specs: ASK,
    images: photos("CT-04", 4)
  },
  {
    code: "CT-05",
    category: "carts",
    featured: false,
    name: { ar: "عربة نقل كبيرة بصندوق عميق", en: "Large Deep-Box Cart" },
    description: {
      ar: "عربة نقل كبيرة بصندوق عميق من الصاج على عجلتين كاوتش وذراعين، لنقل كميات كبيرة من الخامات والمونة. متاحة مدهونة أو مجلفنة.",
      en: "Large steel cart with a deep box on two rubber wheels and handles, for moving big loads of material and mortar. Available painted or galvanized."
    },
    specs: ASK,
    images: photos("CT-05", 6)
  },
  {
    code: "CT-06",
    category: "carts",
    featured: false,
    name: { ar: "عربة يد صاج بعجلتين كاوتش", en: "Steel Hand Cart with Rubber Wheels" },
    description: {
      ar: "عربة يد من الصاج بعجلتين كاوتش، لنقل الخامات والبلوك داخل الموقع. في الصورة دفعة عربات جاهزة قبل الدهان.",
      en: "Steel-plate hand cart on two rubber wheels for moving materials and blocks around the site. Photo shows a batch ready for painting."
    },
    specs: ASK,
    images: photos("CT-06", 1)
  },

  /* ---------------- مجموعات ---------------- */
  {
    code: "LN-01",
    category: "sets",
    featured: true,
    name: { ar: "مجموعة إنتاج بلوك كاملة: ماكينة + خلاطة + عربة", en: "Complete Block Set: Machine + Mixer + Cart" },
    description: {
      ar: "كل اللي تحتاجه لبدء مصنع بلوك: ماكينة بلوك متحركة + خلاطة بان + عربة تغذية، ونقوم بالتحميل والتوصيل.",
      en: "Everything you need to start a block yard: mobile block machine + pan mixer + feed cart, with loading and delivery."
    },
    specs: ASK,
    images: photos("LN-01", 4)
  },
  {
    code: "HS-01",
    category: "sets",
    featured: true,
    name: { ar: "ونش سكيب لتغذية الخلاطة", en: "Skip Hoist for Mixer Feeding" },
    description: {
      ar: "ونش بعمود وذراع، وموتور بطنبورة سلك، وجنزير وسكيب (قادوس) لرفع الخامات وتغذية الخلاطة بسرعة وتقليل المجهود. مركب على قاعدة حديد قوية، ومتاح بأكثر من لون (أخضر، أزرق، أصفر).",
      en: "Jib hoist with a column and arm, motor-driven wire-rope drum, chain and skip bucket for lifting materials and feeding the mixer quickly with less effort. Mounted on a heavy steel base; available in different colours (green, blue, yellow)."
    },
    specs: ASK,
    images: photos("HS-01", 8)
  },

  /* ---------------- استنباط حديد ---------------- */
  {
    code: "ST-01",
    category: "steel",
    featured: false,
    name: { ar: "استنباط حديد حسب المقاسات المطلوبة", en: "Steel Parts Cut & Made to Your Sizes" },
    description: {
      ar: "استنباط وتقطيع قطع الحديد بالمقاسات اللي العميل محتاجها، بأيدي فنيين خبرة. ابعتلنا المقاسات أو الرسمة واحنا ننفذها.",
      en: "Steel parts cut and fabricated to the exact sizes the customer needs, by experienced craftsmen. Send us your sizes or drawing and we'll make them."
    },
    specs: ASK,
    images: photos("ST-01", 1)
  }
];
