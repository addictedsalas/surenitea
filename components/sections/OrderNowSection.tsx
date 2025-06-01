export default function OrderNowSection() {
  return (
    <section className="py-20 bg-gradient-to-b from-peach/10 to-coral/10">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center">

          <div className="text-center">
            <span className="inline-block bg-surenitea-500 text-white px-4 py-1 rounded-full font-sofia text-xs mb-2">Unidine</span>
            <h2 className="text-3xl md:text-4xl font-recoleta font-bold mb-2 text-surenitea-700">Don&apos;t Wait – Order Now!</h2>
            <p className="text-base md:text-lg text-surenitea-600 font-sofia mb-6 max-w-xl mx-auto">
              Fresh ingredients, mouth-watering recipes, and passion for good food delivered to your door or ready for pick-up.
            </p>
            <button
              className="px-8 py-4 rounded-full font-sofia font-bold text-lg shadow-lg transition-all duration-300 transform hover:scale-105 text-white"
              style={{ 
                backgroundColor: 'var(--color-coral)'
              }}
              disabled
            >
              Order Now
            </button>
            <p className="text-xs mt-2 text-surenitea-400">(Ordering coming soon via UberEats & DoorDash)</p>
          </div>
        </div>
      </div>
    </section>
  );
}
