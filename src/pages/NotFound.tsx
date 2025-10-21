import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  const isAdminPath = location.pathname.includes('/admin');

  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <div className="text-center space-y-6 p-8">
        <h1 className="text-6xl font-bold text-primary">404</h1>
        <p className="text-2xl font-semibold text-foreground">Halaman Tidak Ditemukan</p>
        <p className="text-muted-foreground max-w-md">
          {isAdminPath 
            ? "Halaman admin yang Anda cari tidak ditemukan. Mungkin Anda mencari dashboard admin?"
            : "Maaf, halaman yang Anda cari tidak ditemukan."}
        </p>
        <div className="flex gap-4 justify-center">
          <a 
            href="/" 
            className="inline-flex items-center justify-center rounded-md bg-primary px-6 py-3 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90"
          >
            Kembali ke Beranda
          </a>
          {isAdminPath && (
            <a 
              href="/admin/dashboard" 
              className="inline-flex items-center justify-center rounded-md bg-destructive px-6 py-3 text-sm font-medium text-destructive-foreground shadow transition-colors hover:bg-destructive/90"
            >
              Admin Dashboard
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default NotFound;
