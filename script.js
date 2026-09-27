/**
 * TEKNOLOGI VISUAL INDONESIA (TVI) - INTERACTION SYSTEM
 * Modern, High-Performance, Vanilla JavaScript
 */

document.addEventListener("DOMContentLoaded", () => {
  // 1. HEADER SCROLL INTERACTION
  const header = document.querySelector(".site-header");
  const navToggle = document.querySelector(".nav-toggle");
  const megaItems = document.querySelectorAll(".has-mega");

  function handleScroll() {
    if (!header) return;
    if (window.scrollY > 20) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  }

  window.addEventListener("scroll", handleScroll, { passive: true });
  handleScroll();

  // 2. MOBILE NAVIGATION DRAWER & MEGA ACCORDION
  function isMobile() {
    return window.matchMedia("(max-width: 768px)").matches;
  }

  if (navToggle && header) {
    navToggle.addEventListener("click", () => {
      const isExpanded = navToggle.getAttribute("aria-expanded") === "true";
      navToggle.setAttribute("aria-expanded", String(!isExpanded));
      header.classList.toggle("menu-open");

      if (isExpanded) {
        megaItems.forEach((item) => item.classList.remove("open"));
      }
    });
  }

  // Mega menu click handler on mobile
  megaItems.forEach((item) => {
    const trigger = item.querySelector(":scope > a");
    if (!trigger) return;

    trigger.addEventListener("click", (e) => {
      if (!isMobile()) return;
      e.preventDefault();
      e.stopPropagation();

      const isOpen = item.classList.contains("open");
      megaItems.forEach((other) => other.classList.remove("open"));
      if (!isOpen) {
        item.classList.add("open");
      }
    });
  });

  // Close nav on click outside
  document.addEventListener("click", (e) => {
    if (header && !header.contains(e.target) && header.classList.contains("menu-open")) {
      header.classList.remove("menu-open");
      if (navToggle) navToggle.setAttribute("aria-expanded", "false");
      megaItems.forEach((item) => item.classList.remove("open"));
    }
  });

  // 3. HERO PROJECT SHOWCASE ROTATOR (Homepage)
  const heroShowcase = document.querySelector(".hero-interactive-card");
  if (heroShowcase) {
    const showcaseProjects = [
      {
        badge: "DITPIDER Mabes Polri",
        title: "24/7 Command Center & Multi-Source Video Wall",
        desc: "Sistem display pemantauan real-time dengan video processor multi-input, matrix switching ultra-low latency, dan console operator ergonomis.",
        img: "asset/img/projects/ditpider-mabes-polri.jpg",
        pills: ["Video Wall 3x3", "Matrix Switcher 4K", "Audio DSP Conference"]
      },
      {
        badge: "Pakuwon Mall Surabaya",
        title: "Large Format Indoor Curved LED Display",
        desc: "Display promosi & informasi publik beresolusi tinggi dengan refresh rate 3840Hz dan visual cerah tahan operasi 14 jam non-stop per hari.",
        img: "asset/img/projects/pakuwon-mall-surabaya.jpg",
        pills: ["P2.5 High Refresh LED", "Cloud CMS Signage", "Auto Dimming Sensor"]
      },
      {
        badge: "Pospol Harmoni & Semarang",
        title: "Traffic & Security Surveillance Video Wall",
        desc: "Monitoring jaringan kamera lalu lintas perkotaan terintegrasi dengan ruang koordinasi lapangan dan visual tajam bebas distorsi.",
        img: "asset/img/projects/pospol-harmoni.jpg",
        pills: ["Industrial Display 500 Nits", "Redundant Power Supply", "24/7 Continuous Duty"]
      },
      {
        badge: "FK Kesehatan UHAMKA",
        title: "Smart Auditorium & Lecture Hall",
        desc: "Instalasi proyektor laser skala besar, wireless presentation interaktif, microphone wireless array, dan tata suara merata di seluruh aula.",
        img: "asset/img/projects/fk-kesehatan-uhamka.jpg",
        pills: ["Laser Projector 8000 Lumens", "Motorized Screen 200\"", "Line Array Acoustics"]
      }
    ];

    let currentShowcaseIndex = 0;
    const mediaImg = heroShowcase.querySelector(".hero-card-media img");
    const badgeEl = heroShowcase.querySelector(".hero-card-badge");
    const titleEl = heroShowcase.querySelector(".hero-card-content h3");
    const descEl = heroShowcase.querySelector(".hero-card-content p");
    const pillsWrap = heroShowcase.querySelector(".hero-spec-pills");

    function updateShowcase(index) {
      const p = showcaseProjects[index];
      if (mediaImg) {
        mediaImg.style.opacity = "0.4";
        setTimeout(() => {
          mediaImg.src = p.img;
          mediaImg.style.opacity = "1";
        }, 200);
      }
      if (badgeEl) badgeEl.textContent = p.badge;
      if (titleEl) titleEl.textContent = p.title;
      if (descEl) descEl.textContent = p.desc;
      if (pillsWrap) {
        pillsWrap.innerHTML = p.pills.map((pill) => `<span>${pill}</span>`).join("");
      }
    }

    setInterval(() => {
      currentShowcaseIndex = (currentShowcaseIndex + 1) % showcaseProjects.length;
      updateShowcase(currentShowcaseIndex);
    }, 6000);
  }

  // 4. INTERACTIVE AV PROJECT ESTIMATOR (Homepage Kalkulator)
  const estimatorSection = document.querySelector("#estimatorSection");
  if (estimatorSection) {
    const state = {
      room: "meeting", // meeting, command, led, auditorium
      capacity: "medium", // small, medium, large
      feature: "hybrid" // hybrid, touchscreen, 247
    };

    const roomRadios = estimatorSection.querySelectorAll("[data-room]");
    const capRadios = estimatorSection.querySelectorAll("[data-cap]");
    const featRadios = estimatorSection.querySelectorAll("[data-feat]");

    const resBadge = estimatorSection.querySelector("#estResultBadge");
    const resTitle = estimatorSection.querySelector("#estResultTitle");
    const resItems = estimatorSection.querySelector("#estResultList");
    const resWaBtn = estimatorSection.querySelector("#estWaBtn");

    const configurations = {
      "meeting-small": {
        title: "Huddle Room / Compact Hybrid Setup",
        items: [
          "Display Komersial 55\" / 65\" 4K UHD Anti-Glare",
          "All-in-one Video Bar 4K dengan Auto-Framing AI",
          "Beamforming Microphone Array (jangkauan hingga 4 meter)",
          "Wireless Screen Sharing Dongle (Plug & Play USB-C)",
          "Jalur Kabel Rapi & Cable Retractor Table Box"
        ]
      },
      "meeting-medium": {
        title: "Executive Boardroom / Hybrid Meeting Setup",
        items: [
          "Interactive Touch Panel 75\" / 86\" 4K atau Dual Display 65\"",
          "PTZ Camera 4K dengan Optical Zoom 12x & Speaker Tracking",
          "Ceiling Dante Microphone Array dengan Echo Cancellation",
          "Dedicated In-Ceiling Speakers untuk distribusi suara merata",
          "Tabletop Touch Control Panel untuk kontrol kamera & mic 1 sentuhan"
        ]
      },
      "meeting-large": {
        title: "Large Conference Hall & Multi-Zone Hybrid",
        items: [
          "Large LED Video Wall P1.8 / Dual Laser Proyektor 7000 Lumens",
          "Dual Tracking PTZ Camera (Presenter & Audience View)",
          "Gooseneck Discussion Microphones dengan Auto-Priority",
          "Digital Signal Processor (DSP) dengan integrasi Zoom/Teams",
          "Master Automation System (Lighting, Motorized Blinds & Display)"
        ]
      },
      "command-medium": {
        title: "24/7 Security & Operation Monitoring Center",
        items: [
          "Ultra Narrow Bezel Video Wall 2x2 / 3x2 (55\" Bezel 0.88mm)",
          "Hardware Video Wall Processor multi-window PIP & 4K Input",
          "Matrix Switcher HDMI/HDBaseT Zero-Delay Switching",
          "Audio Monitor & Operator Intercom System",
          "Redundant Power Supply untuk ketahanan operasi non-stop 365 hari"
        ]
      },
      "command-large": {
        title: "Mission Critical Command Center & NOC",
        items: [
          "Seamless Fine-Pitch MicroLED / COB Display P1.2 High Reliability",
          "Distributed AV-over-IP Architecture dengan Control Room Software",
          "Multi-operator KVM Matrix Switching untuk kontrol multi-PC",
          "Integrated Central Audio DSP & Wireless Emergency Paging",
          "Dual Backup Controller & Hot-Swappable Module Design"
        ]
      },
      "led-medium": {
        title: "Commercial Indoor High-Resolution LED Display",
        items: [
          "Die-Cast Aluminum Cabinet LED P2.0 / P2.5 Indoor",
          "High Refresh Rate 3840Hz (Sempurna untuk rekaman kamera/video)",
          "Synchronous/Asynchronous Video Controller dengan Cloud CMS",
          "Front Maintenance Magnet Service Tool (Mudah perawatan)",
          "Wall-Mount Structure Kustom dengan finishing rapi"
        ]
      },
      "led-large": {
        title: "Outdoor Billboard & Large Venue Advertising LED",
        items: [
          "Waterproof IP65 Outdoor LED Cabinet P3.9 / P4.8 High Brightness",
          "Kecerahan 5500-6500 Nits (Sangat terang di bawah terik matahari)",
          "Intelligent Light Sensor (Penyesuaian otomatis siang & malam)",
          "Remote CMS Monitoring via 4G/Cloud Schedule",
          "Proteksi Petir & Sistem Sirkulasi Udara Pendingin Terintegrasi"
        ]
      },
      "auditorium-large": {
        title: "Auditorium, Aula Kampus & Ballroom Setup",
        items: [
          "LED Video Wall Backdrop P2.5 / Dual Motorized Screen 200\"",
          "Active Line Array Sound System dengan Subwoofer terkalibrasi",
          "Digital Audio Mixer 32-Channel dengan Wireless Stage Mics",
          "Stage Lighting & Presenter Follow-Spot System",
          "Multi-Camera Live Production & Streaming Studio Kit"
        ]
      }
    };

    function updateEstimator() {
      // Lookup config
      const key = `${state.room}-${state.capacity}`;
      const fallbackKey = `${state.room}-large`;
      const config = configurations[key] || configurations[fallbackKey] || configurations["meeting-medium"];

      if (resBadge) {
        const roomNames = {
          meeting: "Meeting Room",
          command: "Command Center",
          led: "LED Display",
          auditorium: "Auditorium & Aula"
        };
        resBadge.textContent = `Rekomendasi Solusi • ${roomNames[state.room] || "Audio Visual"}`;
      }

      if (resTitle) resTitle.textContent = config.title;
      if (resItems) {
        resItems.innerHTML = config.items.map((item) => `<li>${item}</li>`).join("");
      }

      // Generate pre-filled WhatsApp link
      if (resWaBtn) {
        const text = encodeURIComponent(
          `Halo Tim Teknologi Visual Indonesia (TVI), saya tertarik dengan estimasi solusi:\n` +
          `• Kebutuhan: ${config.title}\n` +
          `• Tipe Ruang: ${state.room}\n` +
          `• Kapasitas: ${state.capacity}\n\n` +
          `Mohon informasi estimasi anggaran, jadwal survey lokasi, dan ketersediaan perangkat. Terima kasih.`
        );
        resWaBtn.href = `https://wa.me/6281234567890?text=${text}`;
      }
    }

    function setupRadioGroup(radios, prop) {
      radios.forEach((btn) => {
        btn.addEventListener("click", () => {
          radios.forEach((b) => b.classList.remove("selected"));
          btn.classList.add("selected");
          state[prop] = btn.getAttribute(`data-${prop}`);
          updateEstimator();
        });
      });
    }

    setupRadioGroup(roomRadios, "room");
    setupRadioGroup(capRadios, "capacity");
    setupRadioGroup(featRadios, "feature");

    updateEstimator();
  }

  // 5. PROJECT FILTER & MODAL PREVIEW (Project.html)
  const filterBtns = document.querySelectorAll(".filter-btn");
  const projectCards = document.querySelectorAll(".project-card[data-category]");

  if (filterBtns.length > 0 && projectCards.length > 0) {
    filterBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        filterBtns.forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");

        const category = btn.getAttribute("data-filter");

        projectCards.forEach((card) => {
          const cardCat = card.getAttribute("data-category");
          if (category === "all" || cardCat === category) {
            card.style.display = "flex";
            setTimeout(() => {
              card.style.opacity = "1";
              card.style.transform = "translateY(0)";
            }, 50);
          } else {
            card.style.opacity = "0";
            card.style.transform = "translateY(10px)";
            setTimeout(() => {
              card.style.display = "none";
            }, 200);
          }
        });
      });
    });
  }

  // Modal / Lightbox for project preview
  const modalBackdrop = document.querySelector("#projectModal");
  if (modalBackdrop) {
    const modalImg = modalBackdrop.querySelector(".modal-img-wrap img");
    const modalTitle = modalBackdrop.querySelector("#modalProjectTitle");
    const modalClient = modalBackdrop.querySelector("#modalProjectClient");
    const closeBtn = modalBackdrop.querySelector(".modal-close-btn");

    document.querySelectorAll(".project-card").forEach((card) => {
      card.style.cursor = "pointer";
      card.addEventListener("click", () => {
        const img = card.querySelector("img");
        const title = card.querySelector("strong")?.textContent || "Detail Project";
        const client = card.querySelector(".project-client-type")?.textContent || "";

        if (modalImg && img) modalImg.src = img.src;
        if (modalTitle) modalTitle.textContent = title;
        if (modalClient) modalClient.textContent = client;

        modalBackdrop.classList.add("open");
        document.body.style.overflow = "hidden";
      });
    });

    function closeModal() {
      modalBackdrop.classList.remove("open");
      document.body.style.overflow = "";
    }

    if (closeBtn) closeBtn.addEventListener("click", closeModal);
    modalBackdrop.addEventListener("click", (e) => {
      if (e.target === modalBackdrop) closeModal();
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && modalBackdrop.classList.contains("open")) {
        closeModal();
      }
    });
  }

  // 6. DYNAMIC DETAIL PAGES (produk-detail.html & solusi-detail.html)
  const detailTitle = document.querySelector("#detailTitle");
  if (detailTitle) {
    const productDetails = {
      "led-display": [
        "LED Display Indoor & Outdoor",
        "Panel LED modular dengan tingkat refresh rate 3840Hz, kontras tinggi, dan sudut pandang lebar 160° untuk lobby korporat, auditorium, mall signage, dan command center.",
        [
          "Pixel Pitch P1.2, P1.5, P1.8 (Ultra High Definition untuk Boardroom & Control Room)",
          "Pixel Pitch P2.0, P2.5 (Standard Indoor untuk Lobby & Aula)",
          "Pixel Pitch P3.9, P4.8 (High Brightness Weatherproof IP65 untuk Outdoor Billboard)",
          "Front Maintenance Magnetic Service Tool (Perawatan mudah dari depan tanpa bongkar rangka)",
          "Controller NovaStar / Colorlight dengan redundant network & power backup"
        ]
      ],
      "interactive-panel": [
        "Interactive Flat Panel (IFP)",
        "Layar sentuh kolaboratif 4K dengan multi-touch 40-point, zero-bonding glass, built-in Android & Windows OPS, mendukung anotasi cerdas dan wireless casting langsung dari smartphone atau laptop.",
        [
          "Ukuran 65\", 75\", 86\", dan 98\" 4K UHD dengan Anti-Glare Tempered Glass",
          "Pen-to-Paper natural writing latency rendah (< 5ms)",
          "Built-in 48MP AI Camera & 8-Array Microphone untuk Zoom, Teams, Google Meet langsung tanpa PC tambahan",
          "Dual OS Support: Android 13 + Windows 11 Pro OPS Module",
          "Anotasi dokumen PDF, Office, Whiteboard tak terbatas dengan QR export"
        ]
      ],
      "projector": [
        "Laser Projector Profesional",
        "Proyektor laser solid-state bertenaga tinggi untuk aula kampus, ruang ibadah, ballroom hotel, dan ruang rapat besar dengan ketahanan sumber cahaya hingga 20.000 jam bebas perawatan.",
        [
          "Kecerahan 5.000 hingga 12.000 ANSI Lumens untuk visual jernih di ruangan terang",
          "Laser Light Source dengan instant on/off tanpa jeda pemanasan",
          "Lensa fleksibel (Ultra Short Throw, Short Throw, Long Throw interchangeable lens)",
          "Motorized Lens Shift H/V, Zoom, & Focus untuk kalibrasi presisi",
          "Edge Blending & Geometric Correction untuk penggabungan beberapa proyektor"
        ]
      ],
      "projection-screen": [
        "Projection Screen & Motorized Tension",
        "Layar proyeksi tensioned bertegangan mekanis untuk bidang pantul 100% rata tanpa gelombang, menghasilkan kontras optimal dari berbagai sudut pandang.",
        [
          "Motorized Tab-Tensioned Screen (Tepi bersenar penegang anti-kerut)",
          "Fixed Frame Borderless Velvet Screen untuk home cinema & boardroom",
          "Bahan kain Ambient Light Rejecting (ALR) khusus proyektor UST di ruangan berlampu",
          "Trigger sinkronisasi otomatis proyektor dan remote control RF/RS-485",
          "Ukuran custom mulai 100\" hingga 300\" format 16:9 dan 16:10"
        ]
      ],
      "conference-camera": [
        "Conference Camera & AI Tracking PTZ",
        "Kamera konferensi profesional dengan sensor Sony 4K, motor PTZ senyap, fitur auto-framing cerdas, dan presenter tracking untuk meeting hybrid yang dinamis dan terhubung.",
        [
          "Sensor 4K Ultra HD 60fps dengan 12x / 20x / 30x Optical Zoom",
          "AI Voice & Face Tracking: Kamera otomatis menyorot orang yang sedang berbicara",
          "Keluaran simultan USB 3.0, HDMI, 3G-SDI, dan IP NDI|HX untuk broadcast & streaming",
          "Preset posisi kamera dengan penyimpanan memori hingga 255 titik",
          "Kompatibel langsung dengan Zoom Rooms, Microsoft Teams Rooms, Cisco Webex"
        ]
      ],
      "microphone-system": [
        "Microphone System & Audio DSP",
        "Sistem audio konferensi berstandar siaran: microphone ceiling beamforming, wireless gooseneck rapat, dan processor DSP Dante untuk kejernihan suara tanpa gema.",
        [
          "Ceiling Array Beamforming Mic dengan cakupan dinamis 360°",
          "Wireless Gooseneck Discussion System dengan fungsi Chairman Priority & Voting",
          "Acoustic Echo Cancellation (AEC) & AI Noise Suppression (Menghilangkan suara AC dan ketikan)",
          "Dante Networked Audio untuk distribusi kabel LAN Cat6 yang rapi dan bebas interferensi",
          "Integrasi speaker zonasi untuk ruang terpisah atau dapat digabung"
        ]
      ],
      "speaker-amplifier": [
        "Speaker & Power Amplifier Komersial",
        "Sistem penguatan suara komersial untuk ruang pertemuan, koridor gedung, auditorium, dan ruang ibadah dengan artikulasi vokal yang sangat jelas dan distribusi suara merata.",
        [
          "In-Ceiling Coaxial Speakers dengan dispersi suara lebar",
          "Column Array Speakers dengan directivity tinggi untuk ruangan bergema",
          "Multi-Channel Class-D Power Amplifier dengan proteksi beban & standby otomatis",
          "70V/100V Constant Voltage System untuk penarikan kabel jarak jauh di gedung bertingkat",
          "Digital EQ & Crossover Management terpusat"
        ]
      ],
      "video-processor": [
        "Video Wall Processor & Scaler",
        "Unit pengolah visual berkinerja tinggi untuk menampilkan banyak sumber video ke susunan layar video wall secara fleksibel, bebas jeda (zero-latency), dan tanpa distorsi resolusi.",
        [
          "Hardware-based FPGA Architecture (Bebas crash OS, booting dalam hitungan detik)",
          "Menampilkan multi-window: PIP (Picture-in-Picture), POP, Roaming, dan Cross-Screen Scaling",
          "Mendukung resolusi input hingga 8K dan output synchronized 4K@60Hz per display",
          "Web GUI Control & Tablet Drag-and-Drop Layout Switcher yang intuitif bagi operator",
          "Konektivitas HDMI, DisplayPort, SDI, IP Streaming H.264/H.265 RTSP"
        ]
      ],
      "control-panel": [
        "Control Panel & Room Automation",
        "Pusat kendali ruangan terintegrasi: operasikan lampu, proyektor, video wall, volume audio, tirai motorized, dan AC hanya dengan satu sentuhan di layar sentuh meja.",
        [
          "Touch Panel Meja & Dinding 7\" dan 10\" IPS Capacitive Glass",
          "Satu Tombol Skenario (\"Meeting Mode\", \"Presentation Mode\", \"All Power Off\")",
          "Integrasi protokol RS-232, RS-485, IP TCP/UDP, IR, dan Relay I/O",
          "Aplikasi kontrol mobile untuk iPad, Android Tablet, atau browser PC",
          "Monitoring status perangkat secara live dan penjadwalan otomatis hemat energi"
        ]
      ],
      "matrix-switcher": [
        "Matrix Switcher & AV-over-IP",
        "Perangkat distribusi sinyal video dan audio tanpa kompresi untuk menghubungkan berbagai laptop, komputer server, media player, dan kamera ke berbagai layar output.",
        [
          "Matriks 4x4, 8x8, 16x16, hingga 32x32 Modular Seamless Switcher",
          "Seamless Switching: Perpindahan sumber tanpa layar hitam atau glitch",
          "Teknologi HDBaseT: Kirimkan 4K Video, Audio, RS232, dan PoE hingga 100m via kabel LAN",
          "AV-over-IP 1GbE / 10GbE untuk distribusi tak terbatas melalui jaringan switch managed",
          "HDCP 2.2 Compliant & EDID Management otomatis untuk kompatibilitas semua laptop"
        ]
      ],
      "digital-signage": [
        "Digital Signage & CMS Solution",
        "Platform media informasi dan promosi visual mandiri atau terpusat untuk jaringan retail, lobby gedung, hotel, bandara, rumah sakit, dan kampus.",
        [
          "Commercial Display 24/7 dengan kecerahan tinggi 700 - 2500 Nits",
          "Cloud-Based Content Management System (Update konten dari mana saja via browser)",
          "Penjadwalan otomatis: Play video promosi, running text, jadwal meeting, dan cuaca",
          "Mendukung orientasi Vertikal (Portrait) maupun Horizontal (Landscape)",
          "Pilihan model: Wall-Mount Display, Standing Kiosk Interaktif, dan Stretcher Bar Signage"
        ]
      ],
      "room-automation": [
        "Sistem Otomasi & Manajemen Ruang",
        "Sistem sensor dan automasi cerdas yang memastikan ruangan selalu siap pakai: mendeteksi kehadiran peserta, menyalakan sistem otomatis, dan mematikan perangkat saat ruangan kosong.",
        [
          "Sensor Kehadiran PIR & Radar mmWave untuk deteksi otomatis",
          "Panel Jadwal Booking Ruangan di luar pintu (Room Scheduling Display terintegrasi Outlook & Google Calendar)",
          "Sinkronisasi pencahayaan pintar DALI / 0-10V Dimming",
          "Laporan analitik penggunaan ruangan untuk efisiensi fasilitas kantor",
          "Dukungan integrasi Building Management System (BMS)"
        ]
      ]
    };

    const solutionDetails = {
      "meeting-room": [
        "Ruang Rapat & Hybrid Meeting Room",
        "Transformasi ruang rapat menjadi fasilitas kolaborasi hybrid kelas dunia. Setiap peserta, baik yang hadir di ruangan maupun jarak jauh, dapat mendengar, melihat, dan berinteraksi secara alami tanpa hambatan teknis.",
        [
          "Display Komersial 4K / Layar Interaktif Touchscreen 75\" atau 86\"",
          "Kamera Konferensi 4K dengan Auto-Framing & Speaker Tracking",
          "Ceiling Beamforming Microphone & Acoustic Echo Cancellation (AEC)",
          "Wireless Presentation Gateway: Bagikan layar laptop/tablet tanpa kabel HDMI",
          "Satu Tombol 'Join Meeting' kompatibel dengan Zoom, Teams, dan Google Meet"
        ]
      ],
      "boardroom": [
        "Executive Boardroom & Ruang Direksi",
        "Fasilitas ruang rapat eksekutif dengan standar estetika tertinggi, tata kabel tersembunyi 100%, sistem mikrofon gooseneck berprioritas ketua rapat, dan video wall multi-sumber tanpa jeda.",
        [
          "Fine-Pitch LED Video Wall atau Dual Display 85\" Bezel-less",
          "Microphone Discussion System dengan integrasi voting dan enkripsi aman",
          "Tabletop Touch Control Panel dengan interface kustom sesuai identitas perusahaan",
          "Sistem audio terdistribusi dengan kejernihan vokal mutlak",
          "Otomasi pencahayaan, tirai listrik, dan manajemen daya terpusat"
        ]
      ],
      "hybrid-office": [
        "Smart Office & Huddle Collaboration",
        "Jaringan ruang kerja modern yang mendukung mobilitas tinggi, kolaborasi tim lintas departemen, dan alur kerja terhubung di seluruh lantai kantor.",
        [
          "All-in-One Video Bar untuk ruang huddle 4-8 orang",
          "Sistem Reservasi Ruangan (Room Booking Display) di depan pintu ruangan",
          "Digital Signage internal untuk pengumuman perusahaan di area pantry dan lobby",
          "Manajemen perangkat cloud terpusat untuk pemantauan status perangkat oleh tim IT",
          "Dukungan arsitektur BYOM (Bring Your Own Meeting) fleksibel"
        ]
      ],
      "command-center": [
        "Command Center & Ruang Pemantauan 24/7",
        "Infrastruktur visual ruang kendali berkinerja tinggi untuk kepolisian, militer, pusat data, transportasi publik, dan pemantauan industri yang memerlukan keandalan tanpa henti 24 jam sehari, 365 hari setahun.",
        [
          "Ultra-Narrow Bezel Video Wall LCD / Seamless Fine-Pitch MicroLED",
          "Hardware Video Processor dengan input multi-channel (CCTV, SCADA, GIS, Web Dashboard)",
          "KVM Matrix Switching untuk kontrol multi-server dari satu meja operator",
          "Komponen Industrial Grade dengan catu daya redundan & MTBF > 100.000 jam",
          "Integrasi audio komunikasi darurat dan interkom dua arah"
        ]
      ],
      "digital-signage": [
        "Digital Signage & Informasi Publik",
        "Jaringan display visual dinamis untuk menyebarkan informasi, promosi produk, wayfinding interaktif, dan navigasi di mall, bandara, gedung perkantoran, dan fasilitas umum.",
        [
          "Display Komersial High-Brightness 700 - 2500 Nits untuk visibilitas tinggi",
          "Cloud Content Management System (CMS): Jadwalkan konten dari kantor pusat",
          "Layar Sentuh Interaktif untuk peta direktori gedung dan wayfinding",
          "Casing proteksi kustom anti-vandalisme untuk area publik terbuka",
          "Integrasi streaming video live, informasi cuaca, dan ticker berita berjalan"
        ]
      ],
      "auditorium": [
        "Auditorium, Ballroom & Fasilitas Serbaguna",
        "Sistem visual panggung megah dan tata suara akustik bertenaga untuk seminar, wisuda, konser, town hall direksi, dan konferensi berskala ratusan hingga ribuan penonton.",
        [
          "Giant LED Video Wall Backdrop panggung dengan resolusi tinggi",
          "Sistem Sound System Line Array terkalibrasi dengan SPL merata di seluruh kursi penonton",
          "Sistem Mikrofon Nirkabel Multi-Channel anti-interferensi frekuensi",
          "Stage Lighting & Automated Moving Head untuk pencahayaan panggung dramatis",
          "Live Video Switcher & PTZ Camera System untuk streaming dan rekaman siaran"
        ]
      ],
      "smart-classroom": [
        "Smart Classroom & Laboratorium Digital",
        "Ruang kelas dan laboratorium pembelajaran modern yang mendorong interaksi aktif antara pengajar dan peserta didik melalui media visual interaktif dan audio cerdas.",
        [
          "Interactive Touch Display 75\" atau 86\" dengan papan tulis digital pintar",
          "Mikrofon Pengajar Nirkabel ringan dengan penguat suara vokal tanpa lelah",
          "Wireless Screen Mirroring untuk menampilkan karya murid dari tablet/laptop masing-masing",
          "Lecture Capture System: Otomatis merekam suara, video pengajar, dan materi layar",
          "Dukungan kelas hibrida untuk murid yang hadir secara online dari rumah"
        ]
      ],
      "training-room": [
        "Corporate Training Center & Workshop Room",
        "Fasilitas pelatihan karyawan dengan susunan layar ganda, distribusi materi presentasi tanpa jeda, dan fleksibilitas konfigurasi meja ruang pelatihan.",
        [
          "Dual Presentation Display (Layar 1 untuk materi utama, Layar 2 untuk peserta remote/demo)",
          "Sistem audio ruangan dengan mikrofon penangkap suara audiens di meja",
          "Kamera tracking pengajar yang otomatis mengikuti gerak di depan papan presentasi",
          "Jalur konektivitas plug-and-play di setiap meja peserta",
          "Kontrol ruangan terpusat dari meja instruktur"
        ]
      ],
      "campus-hall": [
        "Aula Kampus & Gedung Serbaguna Pendidikan",
        "Pusat aktivitas akademik terpadu untuk orasi ilmiah, seminar internasional, pentas seni mahasiswa, dan acara wisuda dengan integrasi visual panggung dan audio akustik prima.",
        [
          "Layar LED Panggung Utama resolusi tinggi tahan pakai",
          "Digital Podium / Mimbar Cerdas dengan layar sentuh presenter dan timer countdown",
          "Sistem Tata Suara Aula PA berdaya tinggi dengan jangkauan akustik jernih",
          "Broadcasting & Live Streaming kit untuk siaran YouTube/Zoom berstandar televisi",
          "Sistem kelistrikan dan proteksi lonjakan voltase stabil"
        ]
      ]
    };

    const params = new URLSearchParams(window.location.search);
    const key = params.get("kategori") || "";
    const isSolusi = window.location.pathname.includes("solusi");
    const source = isSolusi ? solutionDetails : productDetails;
    
    // Default fallback
    const defaultData = isSolusi
      ? [
          "Solusi Audio Visual Terintegrasi",
          "Rancang bangun sistem audio visual, video display, dan otomasi ruang sesuai standar arsitektur dan kebutuhan operasional fasilitas Anda.",
          [
            "Audit & Site Survey Akustik Ruangan",
            "Desain Topologi Sistem & Rekomendasi Hardware Resmi",
            "Instalasi Kabel Terstruktur & Rak Server Rapi",
            "Testing, Commissioning, dan Kalibrasi Warna Layar",
            "Pelatihan Operator Internal & Garansi Resmi Purna Jual"
          ]
        ]
      : [
          "Katalog Perangkat Audio Visual",
          "Perangkat keras display, audio, kamera konferensi, video processor, dan sistem kontrol bersertifikasi resmi untuk integrasi profesional.",
          [
            "Garansi Resmi Distributor Indonesia",
            "Spesifikasi Komersial / Enterprise Grade 24/7",
            "Dukungan Sparepart & Layanan Service Resmi",
            "Kompatibilitas Standar Industri AV Global",
            "Dokumentasi Teknis & Gambar Skema Koneksi Lengkap"
          ]
        ];

    const detail = source[key] || defaultData;
    const [title, description, items] = detail;

    document.title = `${title} | TVI - Teknologi Visual Indonesia`;

    const detailLead = document.querySelector("#detailLead");
    const detailHeading = document.querySelector("#detailHeading");
    const detailDescription = document.querySelector("#detailDescription");
    const detailItems = document.querySelector("#detailItems");
    const detailBreadcrumb = document.querySelector("#detailBreadcrumb");

    if (detailTitle) detailTitle.textContent = title;
    if (detailLead) detailLead.textContent = description;
    if (detailHeading) detailHeading.textContent = title;
    if (detailDescription) detailDescription.textContent = description;
    if (detailBreadcrumb) detailBreadcrumb.textContent = title;
    if (detailItems) {
      detailItems.innerHTML = items.map((item) => `<li>${item}</li>`).join("");
    }

    // Direct WhatsApp consultation link
    const detailWaBtn = document.querySelector("#detailWaBtn");
    if (detailWaBtn) {
      const msg = encodeURIComponent(
        `Halo Tim TVI (Teknologi Visual Indonesia), saya ingin konsultasi mengenai:\n` +
        `• Kategori: ${title}\n\n` +
        `Mohon informasi spesifikasi teknis, rekomendasi perangkat, dan estimasi biaya instalasi. Terima kasih.`
      );
      detailWaBtn.href = `https://wa.me/6281234567890?text=${msg}`;
    }
  }
});
