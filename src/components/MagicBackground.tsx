import React from "react";

const MagicBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {/* Background principal com gradiente animado */}
      <div className="absolute inset-0 bg-gradient-dark animate-gradient-shift" />

      {/* Gradiente mesh animado */}
      <div className="absolute inset-0 bg-gradient-primary opacity-20 animate-gradient-shift" />

      {/* Partículas flutuantes */}
      <div className="particles-bg">
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="particle animate-particles"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 4}s`,
              animationDuration: `${4 + Math.random() * 2}s`,
            }}
          />
        ))}
      </div>

      {/* Meteors */}
      {[...Array(3)].map((_, i) => (
        <div
          key={i}
          className="meteor-effect animate-meteor"
          style={{
            left: `${20 + i * 30}%`,
            top: `${10 + i * 20}%`,
            animationDelay: `${i * 2}s`,
          }}
        />
      ))}

      {/* Grid pattern sutil */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
          `,
          backgroundSize: "50px 50px",
        }}
      />

      {/* Círculos orbitais */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 border border-primary-500/20 rounded-full animate-rotate-slow" />
      <div
        className="absolute top-3/4 right-1/4 w-64 h-64 border border-secondary-500/20 rounded-full animate-rotate-slow"
        style={{ animationDirection: "reverse" }}
      />
      <div className="absolute bottom-1/4 left-1/3 w-32 h-32 border border-accent-500/20 rounded-full animate-rotate-slow" />
    </div>
  );
};

export default MagicBackground;
