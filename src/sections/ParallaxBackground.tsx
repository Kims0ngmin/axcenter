export default function ParallaxBackground() {
  return (
    <div
      className="fixed inset-0 z-0"
      style={{
        backgroundImage: 'url(/axcenter/public/images/background.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
        opacity: 0.08,
        filter: 'blur(2px)',
      }}
    />
  );
}
