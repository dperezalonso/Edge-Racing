"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils";
import { login } from "@/services/authService";
import Image from "next/image";

// Componentes base actualizados
function Button({
  className,
  variant = "default",
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "default" | "outline" | "ghost" | "link";
}) {
  const baseStyles = "inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:opacity-50";

  const variants = {
    default: "bg-primary text-primary-foreground hover:bg-primary/90",
    outline: "border border-input hover:bg-accent hover:text-accent-foreground",
    ghost: "hover:bg-accent hover:text-accent-foreground",
    link: "text-primary underline-offset-4 hover:underline"
  };

  return (
    <button
      data-slot="button"
      className={cn(baseStyles, variants[variant], className)}
      {...props}
    />
  );
}

function Card({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card"
      className={cn("rounded-lg border shadow-sm", className)}
      {...props}
    />
  );
}

function CardContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-content"
      className={cn("p-6 pt-0", className)}
      {...props}
    />
  );
}

function Input({
  className,
  type,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      data-slot="input"
      type={type}
      className={cn(
        "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...props}
    />
  );
}

function Label({
  className,
  ...props
}: React.LabelHTMLAttributes<HTMLLabelElement>) {
  return (
    <label
      data-slot="label"
      className={cn("text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70", className)}
      {...props}
    />
  );
}

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const router = useRouter();
  const searchParams = useSearchParams();

  // Verificar si el usuario viene de un registro exitoso
  useEffect(() => {
    if (searchParams.get('registered') === 'true') {
      setSuccess('Cuenta creada correctamente. Ahora puedes iniciar sesión.');
    }
    // Verificar si hay que mostrar un mensaje de sesión cerrada
    if (searchParams.get('logout') === 'true') {
      setSuccess('Has cerrado sesión correctamente.');
      router.replace('/login'); // Redirigir a la página de inicio de sesión
    }
  }, [searchParams]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const response = await login({
        email: formData.email,
        password: formData.password
      });

      console.log('Login exitoso:', response);
      router.push('/dashboard'); // Redirigir a la página principal después de iniciar sesión
    } catch (error: any) {
      console.error('Error al iniciar sesión:', error);
      setError(error.response?.data?.message || 'Error al iniciar sesión. Por favor, verifica tus credenciales.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen  flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-3xl space-y-6">
        <Card className="overflow-hidden bg-[color:var(--racing-gray)]/80 border-gray-800">
          <CardContent className="grid p-0 md:grid-cols-2">
            <form className="p-6 md:p-8" onSubmit={handleSubmit}>
              <div className="flex flex-col gap-6">
                <div className="flex flex-col items-center text-center">
                  <h1 className="text-2xl font-bold text-white">Bienvenido de nuevo</h1>
                  <p className="text-balance text-gray-400">
                    Accede a tu cuenta de Edge Racing
                  </p>
                </div>

                {error && (
                  <div className="bg-red-900/70 text-white p-3 rounded-md text-sm">
                    {error}
                  </div>
                )}

                {success && (
                  <div className="bg-green-900/70 text-white p-3 rounded-md text-sm">
                    {success}
                  </div>
                )}

                <div className="grid gap-2">
                  <Label htmlFor="email" className="text-gray-300">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="m@example.com"
                    required
                    className="bg-[color:var(--racing-black)] border-gray-700 text-white"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>
                <div className="grid gap-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password" className="text-gray-300">Contraseña</Label>

                  </div>
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    required
                    className="bg-[color:var(--racing-black)] border-gray-700 text-white"
                    value={formData.password}
                    onChange={handleChange}
                  />
                </div>
                <Button
                  className="btn-gradient w-full"
                  type="submit"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <span className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Iniciando sesión...
                    </span>
                  ) : 'Iniciar sesión'}
                </Button>


                <div className="text-center text-sm text-gray-400">
                  ¿No tienes una cuenta?{" "}
                  <Link href="/registro" className="text-[color:var(--motogp-blue)] hover:underline underline-offset-4">
                    Regístrate
                  </Link>
                </div>
              </div>
            </form>
            <div className="relative hidden bg-[color:var(--racing-black)] md:block">
              <div className="absolute inset-0 h-full w-full object-cover overflow-hidden">
                <Image
                  width={500}
                  height={500}
                  src="/images/login-bg.jpg"
                  alt="Fondo de inicio de sesión"
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
          </CardContent>
        </Card>
        <div className="text-balance text-center text-xs text-gray-500">
          Al hacer clic en continuar, aceptas nuestros <Link href="#" className="text-[color:var(--motogp-blue)] hover:underline underline-offset-4">Términos de servicio</Link>{" "}
          y <Link href="#" className="text-[color:var(--motogp-blue)] hover:underline underline-offset-4">Política de privacidad</Link>.
        </div>
        <div className="text-balance text-center text-xs text-gray-500">

          <Link href="/" className="text-[color:var(--motogp-blue)] hover:underline underline-offset-4">
            <Button
              className="btn-primary w-50">

              <div className="text-center text-sm text-primary-foreground">
                volver a {" "}
                Home
              </div>
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}