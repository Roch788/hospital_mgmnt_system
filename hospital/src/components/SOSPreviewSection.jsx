const SOSPreviewSection = ({ onSOSClick }) => {
  return (
    <section className="py-20 px-4 relative overflow-hidden">
      {/* Animated background */}
      <div
        className="absolute inset-0 bg-gradient-to-br from-red-50 to-orange-50"
      />

      {/* Floating emergency icons */}
      <div className="absolute top-10 left-10 text-6xl opacity-10">
        🚨
      </div>
      <div className="absolute bottom-20 right-10 text-5xl opacity-10">
        ❤️
      </div>

      <div className="container mx-auto relative z-10">
        <div className="max-w-4xl mx-auto">
          <div
            className="p-8 md:p-12 glass-card rounded-2xl border-2 border-red-300 relative overflow-hidden"
          >
            {/* Pulsing glow effect */}
            <div
              className="absolute inset-0 bg-gradient-to-r from-red-500 to-orange-500 opacity-0 rounded-2xl"
            />

            <div className="relative z-10">
              <div className="flex items-center gap-4 mb-6">
                <div
                  className="text-6xl"
                >
                  🚨
                </div>
                <h2 className="text-4xl md:text-5xl font-bold font-poppins text-gray-900">
                  Emergency SOS<span className="gradient-text-red"> Feature</span>
                </h2>
              </div>

              <p className="text-lg text-gray-700 mb-8 font-inter max-w-2xl">
                In life-threatening emergencies, activate SOS and instantly connect to the nearest hospital
                and ambulance. Our AI system prioritizes your case and dispatches resources in seconds.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                {[
                  { icon: '⚡', label: 'Instant Dispatch', description: 'Ambulance dispatched in seconds' },
                  { icon: '🗺️', label: 'GPS Matched', description: 'Nearest available resource' },
                  { icon: '📱', label: '24/7 Active', description: 'Always available for emergencies' },
                ].map((item, idx) => (
                  <div
                    key={idx}
                    className="p-4 bg-white/60 rounded-lg border border-red-200"
                  >
                    <div className="text-4xl mb-2">{item.icon}</div>
                    <h4 className="font-bold text-gray-900 mb-1">{item.label}</h4>
                    <p className="text-sm text-gray-600">{item.description}</p>
                  </div>
                ))}
              </div>

              <button
                onClick={onSOSClick}
                className="px-8 py-4 md:py-6 gradient-red-orange text-white rounded-lg font-bold text-lg md:text-xl shadow-lg hover:shadow-2xl transition-all flex items-center justify-center gap-3 mx-auto"
              >
                <span>
                  🚨
                </span>
                Activate Emergency SOS
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SOSPreviewSection;
