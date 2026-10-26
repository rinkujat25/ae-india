const styles = `:root {
            --ink: #191622;
            --ink-soft: #39323f;
            --muted: #6e6879;
            --paper: #fffdf8;
            --cream: #f6f0e7;
            --line: #e9e3da;
            --line-soft: #f0ebe3;
            --violet: #5b3df5;
            --violet-2: #8a73ff;
            --violet-tint: #efeaff;
            --yellow: #ffe7a8;
            --peach: #ffd8c5;
            --mint: #dff7ec;
            --shadow: 0 22px 60px rgba(47, 34, 70, .10);
            --shadow-soft: 0 12px 34px rgba(38, 28, 17, .06);
            --r-lg: 34px;
            --r-md: 26px;
            --r-sm: 18px;
            --gap: 16px;
        }

        * {
            box-sizing: border-box
        }

        html {
            scroll-behavior: smooth
        }

        body {
            margin: 0;
            background: var(--paper);
            color: var(--ink);
            font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Arial, sans-serif;
            -webkit-font-smoothing: antialiased
        }

        a {
            color: inherit;
            text-decoration: none
        }

        img {
            display: block;
            max-width: 100%
        }

        h1,
        h2,
        h3,
        h4 {
            letter-spacing: -.01em
        }

        .wrap {
            width: min(1180px, calc(100% - 40px));
            margin: auto
        }

        /* ---------- nav ---------- */
        .nav {
            position: sticky;
            top: 0;
            z-index: 50;
            background: rgba(255, 253, 248, .86);
            backdrop-filter: blur(18px);
            border-bottom: 1px solid rgba(233, 227, 218, .8)
        }

        .nav-inner {
            height: 72px;
            display: flex;
            align-items: center;
            gap: 28px
        }

        .logo {
            display: flex;
            align-items: center;
            width: 196px;
            min-width: 196px
        }

        .links {
            display: flex;
            gap: 20px;
            font-size: 13.5px;
            color: #4f4958;
            margin-left: 10px;
            white-space: nowrap
        }

        .links a {
            font-weight: 700;
            padding: 6px 0;
            border-bottom: 2px solid transparent
        }

        .links a:hover {
            color: var(--violet);
            border-bottom-color: var(--violet)
        }

        .nav-ai {
            display: inline-flex;
            align-items: center;
            gap: 7px
        }

        .soon-dot {
            font-size: 9px;
            background: var(--yellow);
            color: #5c3b00;
            border: 1px solid #f2ce6d;
            border-radius: 999px;
            padding: 3px 6px;
            font-weight: 900;
            text-transform: uppercase;
            letter-spacing: .4px
        }

        .nav-actions {
            margin-left: auto;
            display: flex;
            gap: 10px
        }

        .btn {
            border: 0;
            border-radius: 999px;
            padding: 13px 20px;
            font-weight: 800;
            font-size: 14px;
            cursor: pointer;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            gap: 8px;
            min-height: 44px;
            transition: transform .18s ease, box-shadow .18s ease
        }

        .btn-primary {
            background: var(--ink);
            color: #fff
        }

        .btn-primary:hover {
            transform: translateY(-1px);
            box-shadow: 0 12px 26px rgba(25, 22, 34, .22)
        }

        .btn-soft {
            background: #fff;
            border: 1px solid var(--line);
            color: var(--ink-soft)
        }

        .btn-soft:hover {
            transform: translateY(-1px);
            border-color: #d9d1c5
        }

        /* ---------- shared section rhythm ---------- */
        .section {
            padding: 96px 0
        }

        .section-tight {
            padding: 72px 0
        }

        .section-head {
            display: grid;
            grid-template-columns: 1fr .68fr;
            gap: 36px;
            align-items: end;
            margin-bottom: 44px
        }

        .kicker {
            font-size: 12px;
            text-transform: uppercase;
            letter-spacing: 1.6px;
            color: var(--violet);
            font-weight: 900
        }

        .section-head h2 {
            font-size: clamp(34px, 4.3vw, 54px);
            line-height: 1.06;
            margin: 12px 0 0;
            max-width: 17ch
        }

        .section-head p {
            color: var(--muted);
            line-height: 1.7;
            margin: 0;
            font-size: 16px
        }

        .accent {
            font-family: Georgia, "Times New Roman", serif;
            font-style: italic;
            font-weight: 500;
            color: var(--violet)
        }

        .icon {
            width: 100%;
            height: 100%;
            stroke: currentColor;
            stroke-width: 1.7;
            fill: none;
            stroke-linecap: round;
            stroke-linejoin: round
        }

        /* ---------- hero ---------- */
        .hero {
            padding: 64px 0 24px;
            overflow: hidden
        }

        .hero-grid {
            display: grid;
            grid-template-columns: 1.04fr .96fr;
            gap: 52px;
            align-items: center
        }

        .eyebrow {
            display: inline-flex;
            align-items: center;
            gap: 8px;
            background: var(--violet-tint);
            color: #4b2ee8;
            border: 1px solid #ded5ff;
            border-radius: 999px;
            padding: 9px 14px;
            font-size: 12px;
            font-weight: 850
        }

        h1 {
            font-size: clamp(42px, 5.4vw, 68px);
            line-height: 1.03;
            margin: 20px 0 20px;
            max-width: 14ch
        }

        .hero-copy {
            font-size: 17px;
            line-height: 1.7;
            color: var(--muted);
            max-width: 56ch;
            margin: 0
        }

        .hero-actions {
            display: flex;
            gap: 12px;
            flex-wrap: wrap;
            margin: 28px 0 0
        }

        .hero-trust {
            display: flex;
            align-items: center;
            gap: 12px;
            margin-top: 22px;
            color: #655f6e;
            font-size: 13px;
            line-height: 1.5
        }

        .avatars {
            display: flex;
            flex: 0 0 auto
        }

        .avatar {
            width: 32px;
            height: 32px;
            border-radius: 50%;
            border: 3px solid var(--paper);
            margin-left: -9px;
            background: linear-gradient(135deg, #ffd1c1, #f5e4ff)
        }

        .avatar:first-child {
            margin-left: 0
        }

        .avatar:nth-child(2) {
            background: linear-gradient(135deg, #d9cdff, #ffeccf)
        }

        .avatar:nth-child(3) {
            background: linear-gradient(135deg, #cfeee0, #e5dcff)
        }

        .hero-points {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 12px;
            margin-top: 34px;
            max-width: 640px
        }

        .hero-point {
            background: #fff;
            border: 1px solid var(--line);
            border-radius: var(--r-sm);
            padding: 18px 16px;
            box-shadow: var(--shadow-soft)
        }

        .hero-point b {
            display: block;
            font-size: 26px;
            line-height: 1;
            color: var(--ink)
        }

        .hero-point span {
            display: block;
            color: var(--muted);
            font-size: 12px;
            line-height: 1.45;
            margin-top: 9px
        }

        /* store preview mock */
        .store-preview {
            position: relative;
            border-radius: 40px;
            background: linear-gradient(150deg, #f0e8ff, #ffe6d7 62%, #fff2bd);
            padding: 20px;
            box-shadow: var(--shadow)
        }

        .preview-card {
            background: rgba(255, 255, 255, .92);
            border: 1px solid rgba(255, 255, 255, .9);
            border-radius: 30px;
            padding: 22px;
            backdrop-filter: blur(14px)
        }

        .preview-head {
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 16px;
            margin-bottom: 18px
        }

        .store-logo {
            display: flex;
            align-items: center;
            gap: 11px;
            font-weight: 900;
            font-size: 14px
        }

        .store-mark {
            width: 40px;
            height: 40px;
            border-radius: 13px;
            background: linear-gradient(135deg, #6244ff, #ff8f72);
            display: grid;
            place-items: center;
            color: #fff;
            flex: 0 0 auto
        }

        .store-mark:before {
            content: "";
            width: 17px;
            height: 17px;
            background: #fff;
            transform: rotate(45deg);
            border-radius: 3px
        }

        .store-logo small {
            display: block;
            font-size: 10px;
            font-weight: 750;
            color: var(--muted);
            margin-top: 2px;
            letter-spacing: .2px
        }

        .budget-pill {
            background: var(--ink);
            color: #fff;
            border-radius: 999px;
            padding: 9px 13px;
            font-size: 11px;
            font-weight: 900;
            white-space: nowrap
        }

        .store-banner {
            background: var(--ink);
            color: #fff;
            border-radius: 24px;
            padding: 22px 22px 20px;
            margin-bottom: 14px
        }

        .store-banner span {
            display: block;
            color: #b7a8ff;
            font-size: 10px;
            text-transform: uppercase;
            letter-spacing: 1.4px;
            font-weight: 900
        }

        .store-banner h2 {
            font-size: 25px;
            line-height: 1.12;
            margin: 10px 0 0
        }

        .preview-chips {
            display: flex;
            gap: 7px;
            flex-wrap: wrap;
            margin-bottom: 13px
        }

        .preview-chips span {
            background: #f7f4ef;
            border: 1px solid #ece5db;
            border-radius: 999px;
            padding: 7px 11px;
            font-size: 10.5px;
            font-weight: 800;
            color: #675f6e
        }

        .preview-chips span.on {
            background: var(--ink);
            border-color: var(--ink);
            color: #fff
        }

        .product-row {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 10px
        }

        .mini-product {
            background: #fff;
            border: 1px solid #eee8df;
            border-radius: var(--r-sm);
            padding: 9px;
            min-width: 0
        }

        .mini-product picture {
            display: block;
            aspect-ratio: 1/1;
            border-radius: 13px;
            overflow: hidden;
            background: #f5f0ff
        }

        .mini-product img {
            width: 100%;
            height: 100%;
            object-fit: cover
        }

        .mini-product b {
            display: block;
            font-size: 11.5px;
            line-height: 1.25;
            margin: 9px 2px 3px
        }

        .mini-product small {
            color: var(--muted);
            font-size: 10.5px;
            padding-left: 2px
        }

        .preview-foot {
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 12px;
            margin-top: 14px;
            padding-top: 14px;
            border-top: 1px solid var(--line-soft);
            font-size: 11px;
            font-weight: 800;
            color: #5f5869
        }

        .bar {
            height: 6px;
            border-radius: 999px;
            background: #efeae2;
            overflow: hidden;
            flex: 1;
            max-width: 150px
        }

        .bar i {
            display: block;
            height: 100%;
            width: 81%;
            border-radius: 999px;
            background: linear-gradient(90deg, var(--violet), var(--violet-2))
        }

        /* ---------- capability strip ---------- */
        .strip {
            padding: 26px 0 0
        }

        .strip-panel {
            border: 1px solid var(--line);
            background: #fff;
            border-radius: 22px;
            padding: 18px 26px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 18px;
            flex-wrap: wrap
        }

        .strip-panel b {
            font-weight: 900;
            color: var(--ink-soft);
            opacity: .8;
            font-size: 13px
        }

        .strip-panel .dot {
            width: 5px;
            height: 5px;
            border-radius: 50%;
            background: #d8d0c4
        }

        /* ---------- programs ---------- */
        .program-grid {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: var(--gap)
        }

        .program {
            background: #fff;
            border: 1px solid var(--line);
            border-radius: var(--r-md);
            padding: 26px;
            position: relative;
            overflow: hidden;
            display: flex;
            flex-direction: column;
            min-height: 262px
        }

        .program:nth-child(1) {
            background: #fff
        }

        .program:nth-child(2) {
            background: var(--violet-tint);
            border-color: #e2daff
        }

        .program:nth-child(3) {
            background: var(--mint);
            border-color: #cdeddf
        }

        .program:nth-child(4) {
            background: #fff0d0;
            border-color: #f4e2b6
        }

        .program:nth-child(5) {
            background: #ffe5da;
            border-color: #f7d3c4
        }

        .program:nth-child(6) {
            background: #f5eafd;
            border-color: #e8d8f5
        }

        .program-ico {
            width: 46px;
            height: 46px;
            border-radius: 14px;
            background: rgba(255, 255, 255, .75);
            border: 1px solid rgba(0, 0, 0, .05);
            display: grid;
            place-items: center;
            color: var(--violet);
            margin-bottom: 18px
        }

        .program-ico svg {
            width: 24px;
            height: 24px
        }

        .program:nth-child(3) .program-ico {
            color: #248a5b
        }

        .program:nth-child(4) .program-ico {
            color: #9b6a00
        }

        .program:nth-child(5) .program-ico {
            color: #b65335
        }

        .program h3 {
            font-size: 21px;
            line-height: 1.2;
            margin: 0 0 10px
        }

        .program p {
            color: #5c5666;
            font-size: 13.5px;
            line-height: 1.6;
            margin: 0 0 auto
        }

        .tags {
            display: flex;
            gap: 7px;
            flex-wrap: wrap;
            margin-top: 20px
        }

        .tags span {
            background: rgba(255, 255, 255, .72);
            border: 1px solid rgba(0, 0, 0, .06);
            border-radius: 999px;
            padding: 7px 11px;
            font-size: 11px;
            font-weight: 800;
            color: #5b5464
        }

        /* ---------- setup steps ---------- */
        .setup {
            background: var(--cream)
        }

        .store-steps {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            gap: var(--gap)
        }

        .step {
            background: #fff;
            border: 1px solid var(--line);
            border-radius: var(--r-md);
            padding: 26px;
            min-height: 250px;
            position: relative;
            overflow: hidden;
            display: flex;
            flex-direction: column
        }

        .step:after {
            content: "";
            position: absolute;
            width: 118px;
            height: 118px;
            border-radius: 50%;
            right: -38px;
            bottom: -46px;
            background: var(--violet-tint)
        }

        .step:nth-child(2):after {
            background: #ffe5d8
        }

        .step:nth-child(3):after {
            background: var(--mint)
        }

        .step:nth-child(4):after {
            background: #fff0cf
        }

        .step-num {
            width: 36px;
            height: 36px;
            border-radius: 50%;
            display: grid;
            place-items: center;
            background: var(--ink);
            color: #fff;
            font-size: 11px;
            font-weight: 900;
            margin-bottom: 26px;
            position: relative;
            z-index: 1
        }

        .step h3 {
            font-size: 20px;
            line-height: 1.2;
            margin: 0 0 10px;
            position: relative;
            z-index: 1
        }

        .step p {
            color: var(--muted);
            font-size: 13.5px;
            line-height: 1.6;
            margin: 0;
            position: relative;
            z-index: 1
        }

        .step-note {
            margin-top: auto;
            padding-top: 18px;
            font-size: 11.5px;
            font-weight: 850;
            color: var(--violet);
            position: relative;
            z-index: 1
        }

        /* ---------- recipient experience ---------- */
        .experience-grid {
            display: grid;
            grid-template-columns: .9fr 1.1fr;
            gap: 22px;
            align-items: stretch
        }

        .phone-panel {
            background: var(--ink);
            color: #fff;
            border-radius: var(--r-lg);
            padding: 30px;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            gap: 26px;
            overflow: hidden;
            position: relative
        }

        .phone-panel:after {
            content: "";
            position: absolute;
            width: 300px;
            height: 300px;
            border-radius: 50%;
            background: rgba(91, 61, 245, .3);
            right: -100px;
            top: -120px;
            filter: blur(10px)
        }

        .phone-top,
        .phone-products,
        .phone-bottom {
            position: relative;
            z-index: 1
        }

        .phone-top span {
            color: #b7a8ff;
            font-size: 11px;
            text-transform: uppercase;
            letter-spacing: 1.4px;
            font-weight: 900
        }

        .phone-top h2 {
            font-size: 32px;
            line-height: 1.08;
            margin: 14px 0 12px
        }

        .phone-top p {
            color: #d6cedf;
            line-height: 1.65;
            margin: 0;
            font-size: 14px
        }

        .phone-products {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 12px
        }

        .phone-product {
            background: #fff;
            color: var(--ink);
            border-radius: 20px;
            padding: 10px
        }

        .phone-product picture {
            display: block;
            aspect-ratio: 1/1;
            border-radius: 15px;
            overflow: hidden;
            background: #f7f4ef
        }

        .phone-product img {
            width: 100%;
            height: 100%;
            object-fit: cover
        }

        .phone-product b {
            display: block;
            font-size: 13px;
            line-height: 1.25;
            margin: 10px 2px 3px
        }

        .phone-product small {
            display: block;
            color: var(--muted);
            font-size: 11px;
            padding-left: 2px
        }

        .phone-bottom {
            display: flex;
            gap: 12px;
            align-items: center;
            background: rgba(255, 255, 255, .09);
            border: 1px solid rgba(255, 255, 255, .15);
            border-radius: 20px;
            padding: 16px
        }

        .phone-bottom span {
            width: 40px;
            height: 40px;
            border-radius: 13px;
            background: #fff;
            color: var(--violet);
            display: grid;
            place-items: center;
            flex: 0 0 auto
        }

        .phone-bottom span svg {
            width: 20px;
            height: 20px
        }

        .phone-bottom p {
            margin: 0;
            color: #e8e2ef;
            font-size: 13px;
            line-height: 1.5
        }

        .flow-list {
            background: #fff;
            border: 1px solid var(--line);
            border-radius: var(--r-lg);
            padding: 10px 30px;
            display: flex;
            flex-direction: column;
            justify-content: center
        }

        .flow-item {
            display: grid;
            grid-template-columns: 44px 1fr;
            gap: 18px;
            padding: 20px 0;
            border-bottom: 1px solid var(--line-soft)
        }

        .flow-item:last-child {
            border-bottom: 0
        }

        .flow-ico {
            width: 44px;
            height: 44px;
            border-radius: 14px;
            background: var(--violet-tint);
            color: var(--violet);
            display: grid;
            place-items: center
        }

        .flow-ico svg {
            width: 22px;
            height: 22px
        }

        .flow-item:nth-child(2) .flow-ico {
            background: #ffe5d8;
            color: #b65335
        }

        .flow-item:nth-child(3) .flow-ico {
            background: var(--mint);
            color: #248a5b
        }

        .flow-item:nth-child(4) .flow-ico {
            background: #fff0cf;
            color: #9b6a00
        }

        .flow-item:nth-child(5) .flow-ico {
            background: #eaf2ff;
            color: #2563eb
        }

        .flow-item h3 {
            font-size: 17px;
            margin: 0 0 6px;
            line-height: 1.25
        }

        .flow-item p {
            margin: 0;
            color: var(--muted);
            font-size: 13.5px;
            line-height: 1.6
        }

        /* ---------- controls ---------- */
        .controls {
            background: var(--cream)
        }

        .rules-grid {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            gap: var(--gap)
        }

        .rule-card {
            background: #fff;
            border: 1px solid var(--line);
            border-radius: var(--r-md);
            padding: 26px;
            display: flex;
            flex-direction: column;
            min-height: 250px
        }

        .rule-ico {
            width: 44px;
            height: 44px;
            border-radius: 14px;
            background: var(--violet-tint);
            color: var(--violet);
            display: grid;
            place-items: center;
            margin-bottom: 20px
        }

        .rule-ico svg {
            width: 22px;
            height: 22px
        }

        .rule-card:nth-child(2) .rule-ico {
            background: #ffe5d8;
            color: #b65335
        }

        .rule-card:nth-child(3) .rule-ico {
            background: var(--mint);
            color: #248a5b
        }

        .rule-card:nth-child(4) .rule-ico {
            background: #fff0cf;
            color: #9b6a00
        }

        .rule-card h3 {
            font-size: 20px;
            line-height: 1.2;
            margin: 0 0 10px
        }

        .rule-card p {
            color: var(--muted);
            line-height: 1.6;
            margin: 0 0 auto;
            font-size: 13.5px
        }

        .rule-card .tags {
            margin-top: 20px
        }

        .rule-card .tags span {
            background: #f7f4ef;
            border-color: #eee6dc
        }

        .tier-band {
            margin-top: var(--gap);
            background: #fff;
            border: 1px solid var(--line);
            border-radius: var(--r-md);
            padding: 26px 30px;
            display: grid;
            grid-template-columns: .8fr 1.2fr;
            gap: 30px;
            align-items: center
        }

        .tier-band h3 {
            margin: 0 0 8px;
            font-size: 20px
        }

        .tier-band>div>p {
            margin: 0;
            color: var(--muted);
            font-size: 13.5px;
            line-height: 1.6
        }

        .tiers {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            gap: 10px
        }

        .tier {
            background: #faf8f4;
            border: 1px solid var(--line-soft);
            border-radius: var(--r-sm);
            padding: 15px
        }

        .tier b {
            display: block;
            font-size: 19px;
            line-height: 1
        }

        .tier span {
            display: block;
            font-size: 11px;
            color: var(--muted);
            margin-top: 7px;
            line-height: 1.4
        }

        /* ---------- comparison ---------- */
        .compare-section {
            padding: 0 0 96px
        }

        .compare {
            background: var(--ink);
            color: #fff;
            border-radius: var(--r-lg);
            padding: 48px;
            position: relative;
            overflow: hidden
        }

        .compare:before {
            content: "";
            position: absolute;
            width: 520px;
            height: 520px;
            border-radius: 50%;
            filter: blur(90px);
            background: rgba(91, 61, 245, .3);
            right: -160px;
            top: -220px
        }

        .compare-head {
            position: relative;
            z-index: 1;
            max-width: 640px;
            margin-bottom: 34px
        }

        .compare-head span {
            color: #b7a8ff;
            font-size: 12px;
            text-transform: uppercase;
            letter-spacing: 1.6px;
            font-weight: 900
        }

        .compare-head h2 {
            font-size: clamp(30px, 3.6vw, 42px);
            line-height: 1.1;
            margin: 14px 0 0
        }

        .compare-cols {
            position: relative;
            z-index: 1;
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: var(--gap)
        }

        .compare-col {
            border-radius: var(--r-md);
            padding: 28px
        }

        .old {
            background: rgba(255, 255, 255, .07);
            border: 1px solid rgba(255, 255, 255, .14)
        }

        .new {
            background: #fff;
            color: var(--ink)
        }

        .compare-col h3 {
            font-size: 24px;
            line-height: 1.15;
            margin: 0 0 6px
        }

        .compare-col>p {
            margin: 0 0 20px;
            font-size: 13px;
            font-weight: 800;
            letter-spacing: .4px;
            text-transform: uppercase
        }

        .old>p {
            color: #a99fb5
        }

        .new>p {
            color: var(--violet)
        }

        .compare-col ul {
            list-style: none;
            margin: 0;
            padding: 0;
            display: grid;
            gap: 12px
        }

        .compare-col li {
            display: grid;
            grid-template-columns: 22px 1fr;
            gap: 11px;
            font-size: 14px;
            line-height: 1.55;
            align-items: start
        }

        .compare-col li i {
            width: 20px;
            height: 20px;
            border-radius: 50%;
            display: grid;
            place-items: center;
            font-style: normal;
            font-size: 11px;
            font-weight: 900;
            margin-top: 1px
        }

        .old li {
            color: #cfc7d8
        }

        .old li i {
            background: rgba(255, 255, 255, .14);
            color: #e4dcec
        }

        .new li {
            color: #4b4555
        }

        .new li i {
            background: var(--mint);
            color: #1c7a4f
        }

        /* ---------- catalogue ---------- */
        .cat-grid {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            gap: var(--gap);
            margin-bottom: var(--gap)
        }

        .cat {
            min-height: 150px;
            border-radius: var(--r-md);
            padding: 22px;
            border: 1px solid var(--line);
            position: relative;
            overflow: hidden;
            background: #fff
        }

        .cat:nth-child(2) {
            background: var(--violet-tint);
            border-color: #e2daff
        }

        .cat:nth-child(3) {
            background: #e5f7ee;
            border-color: #cfeade
        }

        .cat:nth-child(4) {
            background: #fff0d0;
            border-color: #f4e2b6
        }

        .cat:nth-child(5) {
            background: #ffe5da;
            border-color: #f7d3c4
        }

        .cat:nth-child(6) {
            background: #f5eafd;
            border-color: #e8d8f5
        }

        .cat:nth-child(7) {
            background: #eaf2ff;
            border-color: #d6e4fb
        }

        .cat:nth-child(8) {
            background: #f3f0e8;
            border-color: #e6e0d3
        }

        .cat h3 {
            font-size: 17px;
            margin: 0 0 6px
        }

        .cat h3 a {
            color: inherit;
            text-decoration: none
        }

        .cat h3 a:hover {
            color: var(--violet)
        }

        .cat h3 a:focus-visible {
            outline: 3px solid var(--violet);
            outline-offset: 3px
        }

        .cat small {
            color: var(--muted);
            font-size: 12px;
            line-height: 1.45;
            display: block;
            max-width: 16ch
        }

        .cat-icon {
            width: 56px;
            height: 56px;
            position: absolute;
            right: 16px;
            bottom: 14px;
            color: var(--violet);
            stroke: currentColor;
            stroke-width: 1.7;
            fill: none;
            stroke-linecap: round;
            stroke-linejoin: round;
            opacity: .85
        }

        .cat:nth-child(3) .cat-icon,
        .cat:nth-child(6) .cat-icon {
            color: #248a5b
        }

        .cat:nth-child(4) .cat-icon,
        .cat:nth-child(8) .cat-icon {
            color: #9b6a00
        }

        .cat:nth-child(5) .cat-icon {
            color: #b65335
        }

        .cat:nth-child(7) .cat-icon {
            color: #2563eb
        }

        /* ---------- timeline ---------- */
        .timeline {
            background: var(--cream)
        }

        .timeline-grid {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            gap: var(--gap)
        }

        .tl {
            background: #fff;
            border: 1px solid var(--line);
            border-radius: var(--r-md);
            padding: 26px;
            position: relative
        }

        .tl span {
            display: inline-flex;
            background: var(--ink);
            color: #fff;
            border-radius: 999px;
            padding: 6px 12px;
            font-size: 10.5px;
            font-weight: 900;
            text-transform: uppercase;
            letter-spacing: .8px
        }

        .tl h3 {
            font-size: 20px;
            margin: 18px 0 9px
        }

        .tl p {
            color: var(--muted);
            font-size: 13.5px;
            line-height: 1.6;
            margin: 0
        }

        .timeline-foot {
            margin-top: var(--gap);
            background: #fff;
            border: 1px dashed #ddd4c6;
            border-radius: var(--r-md);
            padding: 20px 26px;
            color: var(--ink-soft);
            font-size: 14px;
            font-weight: 800;
            display: flex;
            align-items: center;
            gap: 12px;
            flex-wrap: wrap
        }

        .timeline-foot em {
            font-style: normal;
            color: var(--muted);
            font-weight: 600
        }

        /* ---------- ai ---------- */
        .ai-panel {
            display: grid;
            grid-template-columns: .92fr 1.08fr;
            gap: 22px;
            align-items: stretch
        }

        .ai-intro {
            background: #fff;
            border: 1px solid var(--line);
            border-radius: var(--r-lg);
            padding: 34px;
            display: flex;
            flex-direction: column
        }

        .ai-badge {
            display: inline-flex;
            align-items: center;
            gap: 8px;
            background: var(--yellow);
            color: #5c3b00;
            border: 1px solid #f2ce6d;
            border-radius: 999px;
            padding: 8px 13px;
            font-size: 11px;
            font-weight: 900;
            text-transform: uppercase;
            letter-spacing: .5px;
            width: fit-content
        }

        .ai-intro h3 {
            font-size: 30px;
            line-height: 1.12;
            margin: 20px 0 14px
        }

        .ai-intro p {
            color: var(--muted);
            line-height: 1.7;
            margin: 0 0 auto;
            font-size: 15px
        }

        .ai-intro .btn {
            margin-top: 26px;
            width: fit-content
        }

        .ai-queries {
            background: #fff;
            border: 1px solid var(--line);
            border-radius: var(--r-lg);
            padding: 26px;
            display: grid;
            gap: 11px;
            align-content: start
        }

        .ai-queries>b {
            font-size: 12px;
            text-transform: uppercase;
            letter-spacing: 1.3px;
            color: var(--muted);
            font-weight: 900;
            margin-bottom: 2px
        }

        .query {
            background: #faf8f4;
            border: 1px solid var(--line-soft);
            border-radius: var(--r-sm);
            padding: 16px 18px;
            font-size: 14px;
            line-height: 1.5;
            color: var(--ink-soft)
        }

        .query span {
            display: block;
            color: var(--violet);
            font-size: 11px;
            font-weight: 900;
            text-transform: uppercase;
            letter-spacing: .9px;
            margin-bottom: 6px
        }

        /* ---------- cta ---------- */
        .cta {
            padding: 0 0 96px
        }

        .cta-panel {
            background: linear-gradient(130deg, #5b3df5, #2d1a9d);
            border-radius: var(--r-lg);
            color: #fff;
            padding: 52px;
            display: grid;
            grid-template-columns: 1fr auto;
            gap: 34px;
            align-items: center;
            overflow: hidden;
            position: relative
        }

        .cta-panel:after {
            content: "✦";
            position: absolute;
            font-size: 250px;
            line-height: 1;
            color: rgba(255, 255, 255, .09);
            right: 36px;
            top: -70px
        }

        .cta-panel h2 {
            font-size: clamp(30px, 3.6vw, 42px);
            line-height: 1.08;
            margin: 0 0 14px;
            position: relative;
            z-index: 1;
            max-width: 18ch
        }

        .cta-panel p {
            color: #dcd4ff;
            line-height: 1.7;
            margin: 0;
            max-width: 60ch;
            position: relative;
            z-index: 1;
            font-size: 15px
        }

        .cta-actions {
            display: flex;
            flex-direction: column;
            gap: 12px;
            position: relative;
            z-index: 1
        }

        .cta-actions .btn-primary {
            background: #fff;
            color: #2d1a9d
        }

        .cta-actions .btn-soft {
            background: rgba(255, 255, 255, .12);
            color: #fff;
            border-color: rgba(255, 255, 255, .2)
        }

        .cta-note {
            margin-top: 4px;
            font-size: 12px;
            color: #c9bfff;
            text-align: center
        }

        /* ---------------- enquiry modal ---------------- */
        dialog#lead-modal {
            border: 0;
            padding: 0;
            background: transparent;
            max-width: min(680px, calc(100% - 32px));
            width: 100%;
            max-height: calc(100dvh - 48px);
            overflow: visible;
            color: var(--ink)
        }

        dialog#lead-modal::backdrop {
            background: rgba(25, 22, 34, .55);
            backdrop-filter: blur(4px)
        }

        dialog#lead-modal[open] {
            animation: modal-in .22s ease
        }

        @keyframes modal-in {
            from {
                opacity: 0;
                transform: translateY(10px) scale(.985)
            }

            to {
                opacity: 1;
                transform: none
            }
        }

        .modal-card {
            background: var(--paper);
            border-radius: var(--r-lg);
            box-shadow: 0 40px 90px rgba(25, 22, 34, .35);
            position: relative;
            max-height: calc(100dvh - 48px);
            display: flex;
            flex-direction: column;
            overflow: hidden
        }

        .modal-close {
            position: absolute;
            top: 14px;
            right: 14px;
            z-index: 2;
            width: 44px;
            height: 44px;
            border-radius: 50%;
            border: 1px solid var(--line);
            background: #fff;
            color: var(--ink-2);
            display: grid;
            place-items: center;
            cursor: pointer;
            padding: 0;
            transition: background .15s ease, border-color .15s ease
        }

        .modal-close:hover {
            background: var(--cream);
            border-color: #d5ccbe
        }

        .modal-close svg {
            width: 18px;
            height: 18px
        }

        .modal-head {
            padding: 32px 32px 20px;
            border-bottom: 1px solid var(--line);
            flex: 0 0 auto
        }

        .modal-head h2 {
            font-size: var(--t-2xl);
            line-height: 1.15;
            margin: 10px 0 8px;
            padding-right: 44px
        }

        .modal-head p {
            color: var(--muted);
            font-size: var(--t-sm);
            line-height: 1.65;
            max-width: 52ch
        }

        .modal-body {
            padding: 26px 32px 32px;
            overflow-y: auto;
            flex: 1 1 auto;
            -webkit-overflow-scrolling: touch
        }

        body.modal-open {
            overflow: hidden
        }

        /* ---------------- form fields ---------------- */
        .form-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: var(--gap)
        }

        .field {
            display: flex;
            flex-direction: column;
            gap: 7px
        }

        .field.wide {
            grid-column: 1 / -1
        }

        .field label {
            font-size: 11px;
            font-weight: 800;
            text-transform: uppercase;
            letter-spacing: .7px;
            color: var(--muted-2)
        }

        .field label .req {
            color: var(--violet)
        }

        .field input,
        .field select,
        .field textarea {
            font-family: inherit;
            font-size: var(--t-md);
            color: var(--ink);
            background: #fff;
            border: 1.5px solid var(--line);
            border-radius: var(--r-sm);
            padding: 13px 14px;
            min-height: 48px;
            transition: border-color .15s ease, box-shadow .15s ease
        }

        .field textarea {
            min-height: 86px;
            resize: vertical;
            line-height: 1.6
        }

        .field input:focus,
        .field select:focus,
        .field textarea:focus {
            outline: 0;
            border-color: var(--violet);
            box-shadow: 0 0 0 3px var(--violet-tint)
        }

        .field input::placeholder,
        .field textarea::placeholder {
            color: #b0a89e
        }

        .radio-row {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 10px
        }

        .radio-card {
            border: 1.5px solid var(--line);
            border-radius: var(--r-sm);
            padding: 13px;
            cursor: pointer;
            background: #fff;
            display: flex;
            gap: 10px;
            align-items: flex-start;
            transition: border-color .15s ease, background .15s ease
        }

        .radio-card:hover {
            border-color: #d5ccbe
        }

        .radio-card input {
            appearance: none;
            -webkit-appearance: none;
            width: 16px;
            height: 16px;
            min-height: 0;
            padding: 0;
            border-radius: 50%;
            border: 1.5px solid #d6cfc4;
            flex: 0 0 auto;
            margin-top: 2px;
            background: #fff
        }

        .radio-card input:checked {
            border-color: var(--violet);
            border-width: 5px
        }

        .radio-card:has(input:checked) {
            border-color: var(--violet);
            background: #faf8ff
        }

        .radio-card span {
            font-size: var(--t-sm);
            font-weight: 700;
            line-height: 1.35
        }

        .radio-card small {
            display: block;
            font-weight: 500;
            color: var(--muted-2);
            font-size: 11px;
            margin-top: 3px;
            line-height: 1.4
        }

        .form-submit {
            margin-top: 22px;
            display: flex;
            align-items: center;
            gap: 16px;
            flex-wrap: wrap
        }

        .form-submit .btn {
            padding: 15px 26px
        }

        .form-note {
            font-size: 11px;
            color: var(--muted-2);
            line-height: 1.5;
            flex: 1;
            min-width: 180px
        }

        .form-status {
            margin-top: 16px;
            border-radius: var(--r-sm);
            padding: 14px 16px;
            font-size: var(--t-sm);
            line-height: 1.6;
            background: var(--mint);
            color: var(--mint-ink);
            border: 1px solid #b8e8d0
        }

        .form-status.error {
            background: #ffe9e4;
            color: #a8482a;
            border-color: #f7c9bb
        }

        /* ---------- footer ---------- */
        .footer {
            padding: 52px 0 30px;
            border-top: 1px solid var(--line)
        }

        .footer-grid {
            display: grid;
            grid-template-columns: 1.3fr repeat(3, .7fr);
            gap: 40px
        }

        .footer h2 {
            font-size: 12px;
            text-transform: uppercase;
            letter-spacing: .9px;
            margin: 0 0 16px
        }

        .footer a {
            display: block;
            color: var(--muted);
            font-size: 13px;
            margin: 10px 0
        }

        .footer a:hover {
            color: var(--violet)
        }

        .footer .logo {
            margin-bottom: 18px
        }

        .foot-copy {
            max-width: 38ch;
            color: var(--muted);
            line-height: 1.65;
            font-size: 13.5px;
            margin: 0
        }

        .copyright {
            margin-top: 44px;
            padding-top: 22px;
            border-top: 1px solid var(--line);
            font-size: 12px;
            color: #8a838f;
            display: flex;
            justify-content: space-between;
            gap: 20px;
            flex-wrap: wrap
        }

        /* ---------- responsive ---------- */
        @media (max-width:1080px) {

            .program-grid,
            .rules-grid,
            .cat-grid,
            .timeline-grid {
                grid-template-columns: repeat(2, 1fr)
            }

            .store-steps {
                grid-template-columns: repeat(2, 1fr)
            }

        }

        @media (max-width:1120px) {
            .links {
                display: none
            }
        }

        @media (max-width:980px) {
            .section {
                padding: 70px 0
            }

            .section-tight {
                padding: 56px 0
            }

            .section-head {
                grid-template-columns: 1fr;
                gap: 18px;
                margin-bottom: 32px
            }

            .section-head h2 {
                max-width: 20ch
            }

            .hero {
                padding: 44px 0 12px
            }

            .hero-grid {
                grid-template-columns: 1fr;
                gap: 34px
            }

            h1 {
                max-width: 18ch
            }

            .experience-grid,
            .ai-panel,
            .compare-cols,
            .tier-band,
            .cta-panel {
                grid-template-columns: 1fr
            }

            .flow-list {
                padding: 14px 26px
            }

            .compare {
                padding: 34px
            }

            .cta-panel {
                padding: 38px
            }

            .cta-actions {
                flex-direction: row;
                flex-wrap: wrap
            }

            .footer-grid {
                grid-template-columns: 1fr 1fr;
                gap: 32px
            }

            .tiers {
                grid-template-columns: repeat(4, 1fr)
            }
        }

        @media (max-width:640px) {
            dialog#lead-modal {
                width: 100%;
                max-width: 100%;
                max-height: 92dvh;
                margin: 0;
                inset: auto 0 0 0
            }

            .modal-card {
                border-radius: var(--r-lg) var(--r-lg) 0 0;
                max-height: 92dvh
            }

            .modal-head h2 {
                padding-right: 48px
            }

            .modal-head {
                padding: 26px 22px 18px
            }

            .modal-body {
                padding: 22px
            }

            .wrap {
                width: min(100% - 28px, 1180px)
            }

            .nav-inner {
                height: 64px;
                gap: 12px
            }

            .logo {
                width: 150px;
                min-width: 150px
            }

            .nav-actions .btn-soft {
                display: none
            }

            .section {
                padding: 56px 0
            }

            .section-tight {
                padding: 44px 0
            }

            .compare-section,
            .cta {
                padding-bottom: 56px
            }

            h1 {
                font-size: 38px;
                line-height: 1.08;
                max-width: none
            }

            .hero-copy {
                font-size: 16px
            }

            .hero-actions {
                gap: 10px
            }

            .hero-actions .btn {
                width: 100%
            }

            .hero-points {
                grid-template-columns: 1fr;
                gap: 10px;
                margin-top: 26px
            }

            .hero-point {
                display: flex;
                align-items: baseline;
                gap: 12px;
                padding: 15px 16px
            }

            .hero-point b {
                font-size: 22px
            }

            .hero-point span {
                margin-top: 0
            }

            .store-preview {
                border-radius: 28px;
                padding: 12px
            }

            .preview-card {
                border-radius: 22px;
                padding: 16px
            }

            .store-banner h2 {
                font-size: 21px
            }

            .product-row {
                grid-template-columns: repeat(3, 1fr);
                gap: 8px
            }

            .mini-product {
                padding: 7px
            }

            .mini-product b {
                font-size: 10.5px
            }

            .mini-product small {
                display: none
            }

            .strip-panel {
                padding: 16px 18px;
                gap: 9px 16px;
                justify-content: flex-start
            }

            .strip-panel .dot {
                display: none
            }

            .program-grid,
            .store-steps,
            .rules-grid,
            .timeline-grid,
            .phone-products {
                grid-template-columns: 1fr
            }

            .cat-grid {
                grid-template-columns: 1fr 1fr
            }

            .cat {
                min-height: 132px;
                padding: 17px
            }

            .cat small {
                display: none
            }

            .cat-icon {
                width: 42px;
                height: 42px;
                right: 12px;
                bottom: 12px
            }

            .program,
            .step,
            .rule-card {
                min-height: 0
            }

            .phone-panel {
                border-radius: 26px;
                padding: 24px
            }

            .phone-top h2 {
                font-size: 27px
            }

            .flow-list {
                border-radius: 26px;
                padding: 6px 22px
            }

            .flow-item {
                grid-template-columns: 38px 1fr;
                gap: 14px;
                padding: 17px 0
            }

            .flow-ico {
                width: 38px;
                height: 38px;
                border-radius: 12px
            }

            .tier-band {
                padding: 22px;
                gap: 20px
            }

            .tiers {
                grid-template-columns: 1fr 1fr
            }

            .compare {
                padding: 26px;
                border-radius: 26px
            }

            .compare-col {
                padding: 22px
            }

            .ai-intro,
            .ai-queries {
                padding: 24px;
                border-radius: 26px
            }

            .ai-intro h3 {
                font-size: 25px
            }

            .cta-panel {
                padding: 28px;
                border-radius: 26px
            }

            .cta-panel:after {
                display: none
            }

            .cta-actions {
                flex-direction: column
            }

            .cta-actions .btn {
                width: 100%
            }

            .footer-grid {
                grid-template-columns: 1fr;
                gap: 26px
            }

            .copyright {
                flex-direction: column;
                gap: 8px
            }
        }
  /* faq */
  .faq-wrap{padding:78px 0;border-top:1px solid var(--line)}
  .faq-head{margin-bottom:34px}
  .faq-head h2{font-size:var(--t-2xl);line-height:1.15;margin-top:10px}
  .faq-head p{color:var(--muted);font-size:var(--t-sm);line-height:1.65;margin-top:8px;max-width:56ch}
  .faq-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:14px 24px;align-items:start}
  .faq{border:1px solid var(--line);border-radius:var(--r-md);background:var(--card);overflow:hidden}
  .faq summary{list-style:none;cursor:pointer;padding:20px 22px;font-weight:700;font-size:var(--t-md);line-height:1.5;display:grid;grid-template-columns:1fr 20px;gap:14px;align-items:start}
  .faq summary::-webkit-details-marker{display:none}
  .faq summary:hover{color:var(--violet)}
  .faq-plus{width:20px;height:20px;color:var(--violet);margin-top:2px;transition:transform .2s ease;flex:0 0 auto}
  .faq[open] .faq-plus{transform:rotate(45deg)}
  .faq p{padding:0 22px 22px;color:var(--muted);font-size:var(--t-sm);line-height:1.7}
  @media (max-width:860px){ .faq-grid{grid-template-columns:1fr} }
`;

export function GiftStoreStyles() {
  return <style dangerouslySetInnerHTML={{ __html: styles }} />;
}
