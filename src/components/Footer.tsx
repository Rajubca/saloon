export default function Footer() {
  return (
    <footer className="bg-brand-900 border-t border-brand-200/20 py-12 px-6">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <h3 className="text-2xl font-serif text-brand-600 mb-4">Free Bird Saloon</h3>
          <p className="text-brand-300">Where Music Flies Free.</p>
        </div>
        <div>
          <h4 className="text-lg font-serif text-brand-400 mb-4 uppercase">Visit Us</h4>
          <p className="text-brand-300">New Vaghodiya Road</p>
          <p className="text-brand-300">Baroda</p>
        </div>
        <div>
          <h4 className="text-lg font-serif text-brand-400 mb-4 uppercase">Contact</h4>
          <p className="text-brand-300">Rajash Joshi</p>
          <p className="text-brand-300 text-neon">9898678440</p>
        </div>
      </div>
      <div className="max-w-6xl mx-auto mt-12 pt-8 border-t border-brand-200/10 text-center text-brand-400 text-sm">
        &copy; {new Date().getFullYear()} Free Bird Saloon. All rights reserved.
      </div>
    </footer>
  );
}
