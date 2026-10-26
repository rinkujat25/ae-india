const styles = `
  .home-motion > div,
  .home-motion > section,
  .home-motion > header {
    animation: home-section-rise .72s cubic-bezier(.2,.65,.2,1) both;
  }

  .home-motion > div:nth-child(1) { animation-delay: .03s; }
  .home-motion > div:nth-child(2) { animation-delay: .08s; }
  .home-motion > div:nth-child(3) { animation-delay: .13s; }
  .home-motion > div:nth-child(4) { animation-delay: .18s; }
  .home-motion > div:nth-child(5) { animation-delay: .23s; }
  .home-motion > div:nth-child(6) { animation-delay: .28s; }
  .home-motion > div:nth-child(7) { animation-delay: .33s; }
  .home-motion > div:nth-child(8) { animation-delay: .38s; }

  .home-motion .hero h1,
  .home-motion .hero-copy,
  .home-motion .hero-actions,
  .home-motion .builder-card {
    animation: home-soft-in .78s cubic-bezier(.2,.65,.2,1) both;
  }

  .home-motion .hero-copy { animation-delay: .1s; }
  .home-motion .hero-actions { animation-delay: .18s; }
  .home-motion .builder-card { animation-delay: .22s; }

  .home-motion .stat,
  .home-motion .model,
  .home-motion .cat,
  .home-motion .step,
  .home-motion .ai-card,
  .home-motion .proof-stat,
  .home-motion .faq {
    transition: transform .24s ease, box-shadow .24s ease, border-color .24s ease;
  }

  .home-motion .stat:hover,
  .home-motion .model:hover,
  .home-motion .cat:hover,
  .home-motion .step:hover,
  .home-motion .ai-card:hover,
  .home-motion .proof-stat:hover,
  .home-motion .faq:hover {
    transform: translateY(-3px);
    box-shadow: 0 16px 34px rgba(31, 29, 28,.08);
  }

  .home-motion .btn {
    transition: transform .2s ease, box-shadow .2s ease, border-color .2s ease, background .2s ease;
  }

  .home-motion .btn:hover {
    transform: translateY(-2px);
  }

  @keyframes home-section-rise {
    from {
      opacity: 0;
      transform: translateY(18px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes home-soft-in {
    from {
      opacity: 0;
      transform: translateY(14px) scale(.99);
    }
    to {
      opacity: 1;
      transform: translateY(0) scale(1);
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .home-motion *,
    .home-motion > div,
    .home-motion > section,
    .home-motion > header {
      animation: none !important;
      transition: none !important;
      transform: none !important;
    }
  }
`;

export function HomeMotionStyles() {
  return <style dangerouslySetInnerHTML={{ __html: styles }} />;
}
