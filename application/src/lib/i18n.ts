/**
 * PlantCare AI - English / Arabic interface dictionary.
 * Arabic is optional; English is the primary interface language.
 */

export const en = {
  // Brand & navigation
  "app.tagline": "Smart Plant Identification, Disease Detection & Care Assistant",
  "nav.home": "Home",
  "nav.scan": "Scan Plant",
  "nav.plants": "My Plants",
  "nav.deliverables": "Project Files",

  // Provider / mode badges
  "mode.aiConnected": "AI Connected",
  "mode.demo": "Demo Mode",
  "mode.demoToggle": "Use Demo Mode",
  "mode.demoHint": "Demo Mode returns clearly-labeled sample results without calling the AI service.",
  "mode.theme": "Theme",

  // Hero
  "hero.welcome": "Welcome to PlantCare AI",
  "hero.description":
    "Take a photo of any plant and let AI identify the species, check its health for visible disease symptoms, and get a complete care guide — watering, sunlight, soil and more.",
  "hero.start": "Start Plant Analysis",
  "hero.upload": "Upload Plant Image",
  "hero.stat.scans": "AI analyses",
  "hero.stat.plants": "Plants saved",
  "hero.stat.demo": "Demo Mode ready",

  // Feature highlights
  "features.title": "Everything your plants need",
  "features.identify.title": "Identify Plants",
  "features.identify.desc": "Common and scientific names with a botanical description.",
  "features.detect.title": "Detect Diseases",
  "features.detect.desc": "Visible leaf symptoms and possible problems, with honest uncertainty.",
  "features.care.title": "Care Guides",
  "features.care.desc": "Watering, sunlight, soil, temperature and maintenance advice.",
  "features.history.title": "Scan History",
  "features.history.desc": "Every analysis is saved to your My Plants collection.",

  // How it works
  "how.title": "How PlantCare AI Works",
  "how.step1.title": "Upload or capture a photo",
  "how.step1.desc": "Use your phone camera or upload a JPG, PNG or WEBP image.",
  "how.step2.title": "AI analyzes the image",
  "how.step2.desc": "A vision model identifies the species and inspects visible leaf symptoms.",
  "how.step3.title": "Get your plant report",
  "how.step3.desc": "Identification, possible disease signs and full care recommendations.",

  // Recent analyses
  "recent.title": "Recent Analyses",
  "recent.viewAll": "Open My Plants",
  "recent.empty": "No analyses yet — scan your first plant to see it here.",

  // My Plants section (home)
  "plantsSection.title": "My Plants",
  "plantsSection.desc": "Your saved plant collection and analysis history.",
  "plantsSection.open": "Open My Plants",
  "plantsSection.new": "New Analysis",
  "plants.count.singular": "plant saved",
  "plants.count.plural": "plants saved",
  "plants.count.none": "No plants saved yet",
  "plants.countOfAnalyses": "total analyses",

  // Scanner
  "scan.title": "Plant Scanner",
  "scan.desc": "Upload a plant photo or take one with your camera, then run the AI analysis.",
  "scan.dropzone": "Drag & drop a plant photo here, or",
  "scan.browse": "browse files",
  "scan.or": "or",
  "scan.takePhoto": "Take Photo with Camera",
  "scan.formats": "JPG, JPEG, PNG, WEBP — up to 10 MB",
  "scan.analyze": "Analyze Image",
  "scan.analyzing": "Analyzing your plant…",
  "scan.analyzing1": "Uploading image securely…",
  "scan.analyzing2": "AI is identifying the plant…",
  "scan.analyzing3": "Checking visible leaf symptoms…",
  "scan.analyzing4": "Preparing your care guide…",
  "scan.remove": "Remove image",
  "scan.replace": "Replace image",
  "scan.resultFor": "Analysis result",

  // Errors
  "errors.invalidType": "Unsupported file type. Please upload a JPG, JPEG, PNG or WEBP image.",
  "errors.tooLarge": "Image is too large. Maximum size is 10 MB.",
  "errors.noFile": "Please select a plant photo first.",
  "errors.cameraDenied": "Camera access was denied. Allow camera permission or upload a photo instead.",
  "errors.cameraUnavailable": "Camera is not available. Please upload a photo instead.",
  "errors.server": "The analysis could not be completed.",
  "errors.tryAgain": "Try again",

  // Camera
  "camera.title": "Camera Capture",
  "camera.capture": "Capture Photo",
  "camera.close": "Close",
  "camera.switch": "Switch camera",

  // Result
  "result.identification": "Identification",
  "result.health": "Health & Disease",
  "result.care": "Care Guide",
  "result.commonName": "Common name",
  "result.scientificName": "Scientific name",
  "result.category": "Category",
  "result.description": "Description",
  "result.characteristics": "Main characteristics",
  "result.environment": "Suitable growing environment",
  "result.confidence": "Identification confidence",
  "result.noConfidence": "not provided",
  "result.notPlant.title": "This image cannot be identified as a plant",
  "result.notPlant.desc":
    "PlantCare AI only analyzes photographs of plants. Please upload a picture of a leaf, flower, stem or whole plant and try again.",
  "result.symptoms": "Observed symptoms",
  "result.noSymptoms": "No visible disease symptoms detected",
  "result.healthyNote": "The plant appears healthy based on the visible leaf condition.",
  "result.possibleProblem": "Possible problem",
  "result.causes": "Possible causes",
  "result.actions": "Recommended actions",
  "result.prevention": "Prevention advice",
  "result.severity": "Severity",
  "severity.none": "None",
  "severity.low": "Low",
  "severity.moderate": "Moderate",
  "severity.high": "High",
  "severity.unknown": "Unknown",
  "result.uncertainty": "Uncertainty note",
  "result.healthConfidence": "Assessment confidence",
  "result.care.watering": "Watering",
  "result.care.sunlight": "Sunlight",
  "result.care.soil": "Soil",
  "result.care.temperature": "Temperature",
  "result.care.humidity": "Humidity",
  "result.care.fertilization": "Fertilization",
  "result.care.pruning": "Pruning",
  "result.care.maintenance": "General maintenance",
  "result.disclaimer": "Disclaimer",
  "result.save": "Save to My Plants",
  "result.saved": "Saved",
  "result.saving": "Saving…",
  "result.newScan": "New Analysis",
  "result.demoBanner": "Demo Mode result — pre-written sample data, not a live AI analysis.",
  "result.source": "Analyzed with",
  "source.gemini": "Gemini Vision AI",
  "source.vision": "Vision AI",
  "source.demo": "Demo Mode",

  // History / My Plants view
  "history.title": "My Plants",
  "history.desc": "Saved analyses of your plants. Tap a card to reopen the full report.",
  "history.detail": "Plant report",
  "history.savedOn": "Analyzed",
  "history.delete": "Delete",
  "history.deleteTitle": "Delete this plant record?",
  "history.deleteDesc":
    "This will permanently remove the saved analysis from My Plants. This action cannot be undone.",
  "history.cancel": "Cancel",
  "history.deleteConfirm": "Yes, delete",
  "history.back": "Back",

  // Toasts
  "toast.saved": "Plant saved to My Plants",
  "toast.saveFailed": "Could not save the plant record.",
  "toast.deleted": "Plant record deleted",
  "toast.deleteFailed": "Could not delete the record.",

  // Deliverables
  "deliv.title": "Project Deliverables",
  "deliv.desc": "Download the complete PlantCare AI university project package and its documents.",
  "deliv.zip": "Complete Project (ZIP)",
  "deliv.zipDesc": "Application source code, presentation, documents, screenshots and setup guide.",
  "deliv.pptx": "Presentation (PPTX)",
  "deliv.pptxDesc": "15-slide academic PowerPoint for the project presentation.",
  "deliv.pdf": "Presentation (PDF)",
  "deliv.pdfDesc": "Printable PDF version of the presentation.",
  "deliv.report": "Project Report (DOCX)",
  "deliv.reportDesc": "Full academic project report.",
  "deliv.guide": "Installation Guide (DOCX)",
  "deliv.guideDesc": "Step-by-step installation and usage guide.",
  "deliv.notes": "Speaker Notes (DOCX)",
  "deliv.notesDesc": "Per-student speaking scripts for the presentation.",
  "deliv.distribution": "Task Distribution (DOCX)",
  "deliv.distributionDesc": "Responsibilities of the five team members.",
  "deliv.download": "Download",

  // Footer
  "footer.tagline": "Smart Plant Identification, Disease Detection & Care Assistant",
  "footer.students": "Project team",
  "footer.disclaimer":
    "AI analysis provides informational guidance only and cannot replace professional botanical or agricultural inspection.",
  "footer.educational": "Academic project — for educational use.",

  // PWA / install
  "pwa.install": "Install app",
  "pwa.installTitle": "Add PlantCare AI to your phone",
  "pwa.installHint": "Install as a full-screen app with a home-screen icon — works just like a native app.",
  "pwa.installed": "PlantCare AI installed on your device 🌱",
  "pwa.later": "Not now",
} as const;

export type TKey = keyof typeof en;

export const ar: Record<TKey, string> = {
  // Brand & navigation
  "app.tagline": "مساعد ذكي لتحديد النباتات وكشف الأمراض والعناية بها",
  "nav.home": "الرئيسية",
  "nav.scan": "فحص النبات",
  "nav.plants": "نباتاتي",
  "nav.deliverables": "ملفات المشروع",

  // Provider / mode badges
  "mode.aiConnected": "الذكاء الاصطناعي متصل",
  "mode.demo": "الوضع التجريبي",
  "mode.demoToggle": "تشغيل الوضع التجريبي",
  "mode.demoHint": "يعرض الوضع التجريبي نتائج نموذجية معلمة بوضوح دون الاتصال بخدمة الذكاء الاصطناعي.",
  "mode.theme": "المظهر",

  // Hero
  "hero.welcome": "مرحباً بك في PlantCare AI",
  "hero.description":
    "التقط صورة لأي نبات ودع الذكاء الاصطناعي يحدد نوعه، ويفحص صحته وأعراض الأمراض الظاهرة، ويمنحك دليل عناية كامل — الري والضوء والتربة والمزيد.",
  "hero.start": "بدء تحليل النبات",
  "hero.upload": "رفع صورة نبات",
  "hero.stat.scans": "تحليلاً بالذكاء الاصطناعي",
  "hero.stat.plants": "نباتاً محفوظاً",
  "hero.stat.demo": "الوضع التجريبي جاهز",

  // Feature highlights
  "features.title": "كل ما تحتاجه نباتاتك",
  "features.identify.title": "تحديد النباتات",
  "features.identify.desc": "الأسماء الشائعة والعلمية مع وصف نباتي للنبات.",
  "features.detect.title": "كشف الأمراض",
  "features.detect.desc": "الأعراض الورقية الظاهرة والمشكلات المحتملة مع درجة يقين صادقة.",
  "features.care.title": "أدلة العناية",
  "features.care.desc": "نصائح للري والضوء والتربة والحرارة والصيانة.",
  "features.history.title": "سجل الفحوصات",
  "features.history.desc": "يُحفظ كل تحليل في مجموعة نباتاتي.",

  // How it works
  "how.title": "كيف يعمل PlantCare AI",
  "how.step1.title": "ارفع أو التقط صورة",
  "how.step1.desc": "استخدم كاميرا هاتفك أو ارفع صورة بصيغة JPG أو PNG أو WEBP.",
  "how.step2.title": "الذكاء الاصطناعي يحلل الصورة",
  "how.step2.desc": "يحدد نموذج الرؤية نوع النبات ويفحص الأعراض الورقية الظاهرة.",
  "how.step3.title": "استلم تقرير نباتك",
  "how.step3.desc": "تحديد الهوية، وعلامات المرض المحتملة، وتوصيات العناية الكاملة.",

  // Recent analyses
  "recent.title": "أحدث التحليلات",
  "recent.viewAll": "فتح نباتاتي",
  "recent.empty": "لا توجد تحليلات بعد — افحص نباتك الأول لتراه هنا.",

  // My Plants section (home)
  "plantsSection.title": "نباتاتي",
  "plantsSection.desc": "مجموعة النباتات المحفوظة وسجل التحليلات.",
  "plantsSection.open": "فتح نباتاتي",
  "plantsSection.new": "تحليل جديد",
  "plants.count.singular": "نبات محفوظ",
  "plants.count.plural": "نباتات محفوظة",
  "plants.count.none": "لم تُحفظ أي نباتات بعد",
  "plants.countOfAnalyses": "إجمالي التحليلات",

  // Scanner
  "scan.title": "ماسح النبات",
  "scan.desc": "ارفع صورة نبات أو التقطها بالكاميرا ثم شغّل تحليل الذكاء الاصطناعي.",
  "scan.dropzone": "اسحب صورة النبات وأفلتها هنا، أو",
  "scan.browse": "استعرض الملفات",
  "scan.or": "أو",
  "scan.takePhoto": "التقاط صورة بالكاميرا",
  "scan.formats": "JPG, JPEG, PNG, WEBP — حتى 10 ميغابايت",
  "scan.analyze": "تحليل الصورة",
  "scan.analyzing": "جارٍ تحليل نباتك…",
  "scan.analyzing1": "جارٍ رفع الصورة بشكل آمن…",
  "scan.analyzing2": "الذكاء الاصطناعي يحدد نوع النبات…",
  "scan.analyzing3": "جارٍ فحص أعراض الأوراق الظاهرة…",
  "scan.analyzing4": "جارٍ تجهيز دليل العناية…",
  "scan.remove": "إزالة الصورة",
  "scan.replace": "استبدال الصورة",
  "scan.resultFor": "نتيجة التحليل",

  // Errors
  "errors.invalidType": "نوع الملف غير مدعوم. يرجى رفع صورة بصيغة JPG أو JPEG أو PNG أو WEBP.",
  "errors.tooLarge": "حجم الصورة كبير جداً. الحد الأقصى 10 ميغابايت.",
  "errors.noFile": "يرجى اختيار صورة نبات أولاً.",
  "errors.cameraDenied": "تم رفض الوصول إلى الكاميرا. اسمح بالتصريح أو ارفع صورة بدلاً من ذلك.",
  "errors.cameraUnavailable": "الكاميرا غير متوفرة. يرجى رفع صورة بدلاً من ذلك.",
  "errors.server": "تعذر إكمال التحليل.",
  "errors.tryAgain": "أعد المحاولة",

  // Camera
  "camera.title": "التقاط بالكاميرا",
  "camera.capture": "التقاط الصورة",
  "camera.close": "إغلاق",
  "camera.switch": "تبديل الكاميرا",

  // Result
  "result.identification": "تحديد الهوية",
  "result.health": "الصحة والأمراض",
  "result.care": "دليل العناية",
  "result.commonName": "الاسم الشائع",
  "result.scientificName": "الاسم العلمي",
  "result.category": "التصنيف",
  "result.description": "الوصف",
  "result.characteristics": "الخصائص الرئيسية",
  "result.environment": "البيئة المناسبة للنمو",
  "result.confidence": "درجة اليقين في التحديد",
  "result.noConfidence": "غير متوفرة",
  "result.notPlant.title": "لا يمكن تحديد هذه الصورة كنبات",
  "result.notPlant.desc":
    "يقوم PlantCare AI بتحليل صور النباتات فقط. يرجى رفع صورة لورقة أو زهرة أو ساق أو نبات كامل والمحاولة مجدداً.",
  "result.symptoms": "الأعراض المرصودة",
  "result.noSymptoms": "لم تُرصد أعراض مرضية ظاهرة",
  "result.healthyNote": "يبدو النبات صحياً استناداً إلى حالة أوراقه الظاهرة.",
  "result.possibleProblem": "المشكلة المحتملة",
  "result.causes": "الأسباب المحتملة",
  "result.actions": "الإجراءات الموصى بها",
  "result.prevention": "نصائح الوقاية",
  "result.severity": "درجة الخطورة",
  "severity.none": "لا شيء",
  "severity.low": "منخفضة",
  "severity.moderate": "متوسطة",
  "severity.high": "عالية",
  "severity.unknown": "غير معروفة",
  "result.uncertainty": "ملاحظة عدم اليقين",
  "result.healthConfidence": "درجة يقين التقييم",
  "result.care.watering": "الري",
  "result.care.sunlight": "الضوء",
  "result.care.soil": "التربة",
  "result.care.temperature": "درجة الحرارة",
  "result.care.humidity": "الرطوبة",
  "result.care.fertilization": "التسميد",
  "result.care.pruning": "التقليم",
  "result.care.maintenance": "الصيانة العامة",
  "result.disclaimer": "إخلاء مسؤولية",
  "result.save": "حفظ في نباتاتي",
  "result.saved": "محفوظ",
  "result.saving": "جارٍ الحفظ…",
  "result.newScan": "تحليل جديد",
  "result.demoBanner": "نتيجة الوضع التجريبي — بيانات نموذجية وليست تحليلاً حياً بالذكاء الاصطناعي.",
  "result.source": "تم التحليل بواسطة",
  "source.gemini": "Gemini Vision AI",
  "source.vision": "Vision AI",
  "source.demo": "الوضع التجريبي",

  // History / My Plants view
  "history.title": "نباتاتي",
  "history.desc": "التحليلات المحفوظة لنباتاتك. اضغط على أي بطاقة لاستعراض التقرير الكامل.",
  "history.detail": "تقرير النبات",
  "history.savedOn": "تم التحليل",
  "history.delete": "حذف",
  "history.deleteTitle": "حذف هذا السجل؟",
  "history.deleteDesc": "سيُحذف هذا التحليل نهائياً من نباتاتي. لا يمكن التراجع عن هذا الإجراء.",
  "history.cancel": "إلغاء",
  "history.deleteConfirm": "نعم، احذف",
  "history.back": "رجوع",

  // Toasts
  "toast.saved": "تم حفظ النبات في نباتاتي",
  "toast.saveFailed": "تعذر حفظ سجل النبات.",
  "toast.deleted": "تم حذف سجل النبات",
  "toast.deleteFailed": "تعذر حذف السجل.",

  // Deliverables
  "deliv.title": "مخرجات المشروع",
  "deliv.desc": "حمّل حزمة مشروع PlantCare AI الجامعي الكاملة ومستنداته.",
  "deliv.zip": "المشروع الكامل (ZIP)",
  "deliv.zipDesc": "الشيفرة المصدرية والعرض والمستندات ولقطات الشاشة ودليل الإعداد.",
  "deliv.pptx": "العرض التقديمي (PPTX)",
  "deliv.pptxDesc": "عرض أكاديمي من 15 شريحة لمناقشة المشروع.",
  "deliv.pdf": "العرض التقديمي (PDF)",
  "deliv.pdfDesc": "نسخة PDF قابلة للطباعة من العرض.",
  "deliv.report": "تقرير المشروع (DOCX)",
  "deliv.reportDesc": "التقرير الأكاديمي الكامل للمشروع.",
  "deliv.guide": "دليل التثبيت (DOCX)",
  "deliv.guideDesc": "دليل خطوة بخطوة للتثبيت والاستخدام.",
  "deliv.notes": "ملاحظات المتحدثين (DOCX)",
  "deliv.notesDesc": "نصوص الإلقاء لكل طالبة أثناء العرض.",
  "deliv.distribution": "توزيع المهام (DOCX)",
  "deliv.distributionDesc": "مسؤوليات أعضاء الفريق الخمس.",
  "deliv.download": "تحميل",

  // Footer
  "footer.tagline": "مساعد ذكي لتحديد النباتات وكشف الأمراض والعناية بها",
  "footer.students": "فريق المشروع",
  "footer.disclaimer":
    "يوفر تحليل الذكاء الاصطناعي إرشادات معلوماتية فقط ولا يمكن أن يحل محل الفحص النباتي أو الزراعي المهني.",
  "footer.educational": "مشروع أكاديمي — للاستخدام التعليمي.",

  // PWA / install
  "pwa.install": "تثبيت التطبيق",
  "pwa.installTitle": "أضف PlantCare AI إلى هاتفك",
  "pwa.installHint": "ثبّته كتطبيق بشاشة كاملة وأيقونة على الشاشة الرئيسية — يعمل مثل تطبيق جوال أصلي.",
  "pwa.installed": "تم تثبيت PlantCare AI على جهازك 🌱",
  "pwa.later": "ليس الآن",
};
