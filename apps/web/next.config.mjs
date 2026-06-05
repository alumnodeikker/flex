/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  images: {
    dangerouslyAllowLocalIP: true,
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '57321',
        pathname: '/**', // 👈 Cambiado de /storage/... a /** para permitir todo
      },
      {
        protocol: 'http',
        hostname: '127.0.0.1',
        port: '57321',
        pathname: '/**', // 👈 Cambiado a /**
      },
      {
        protocol: 'http',
        hostname: '127.0.0.0',
        port: '',              
        pathname: '/**', // 👈 Cambiado a /**
      },
      {
        protocol: 'https',
        hostname: '*.supabase.co',
        pathname: '/**', // 👈 Cambiado también aquí por si en producción cambia la estructura
      },
    ],
  },
};

export default nextConfig;
