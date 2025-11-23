const Loading = ({ fullScreen = false }) => {
  if (fullScreen) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-cream-light to-white">
        <div className="text-center">
          {/* Coffee Cup Animation */}
          <div className="relative inline-block mb-8">
            <div className="w-24 h-24 relative">
              {/* Cup */}
              <div className="absolute inset-0 flex items-center justify-center">
                <img src="/espresso.png" alt="Loading" className="w-20 h-20 animate-float" />
              </div>
              {/* Rotating Circle */}
              <div className="absolute inset-0 border-4 border-transparent border-t-brown border-r-brown rounded-full animate-spin"></div>
              {/* Outer Glow */}
              <div className="absolute inset-0 border-2 border-brown/20 rounded-full animate-pulse"></div>
            </div>
          </div>
          
          <div className="space-y-2">
            <p className="text-2xl text-primary font-serif font-bold">Brewing your experience...</p>
            <div className="flex justify-center gap-2">
              <div className="w-2 h-2 bg-brown rounded-full animate-bounce" style={{animationDelay: '0s'}}></div>
              <div className="w-2 h-2 bg-brown rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
              <div className="w-2 h-2 bg-brown rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center py-12">
      <div className="text-center">
        {/* Coffee Cup Animation */}
        <div className="relative inline-block mb-6">
          <div className="w-20 h-20 relative">
            {/* Cup */}
            <div className="absolute inset-0 flex items-center justify-center">
              <img src="/espresso.png" alt="Loading" className="w-16 h-16 animate-float" />
            </div>
            {/* Rotating Circle */}
            <div className="absolute inset-0 border-4 border-transparent border-t-brown border-r-brown rounded-full animate-spin"></div>
          </div>
        </div>
        
        <div className="space-y-2">
          <p className="text-lg text-primary font-medium">Loading...</p>
          <div className="flex justify-center gap-1.5">
            <div className="w-1.5 h-1.5 bg-brown rounded-full animate-bounce" style={{animationDelay: '0s'}}></div>
            <div className="w-1.5 h-1.5 bg-brown rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
            <div className="w-1.5 h-1.5 bg-brown rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Loading;
