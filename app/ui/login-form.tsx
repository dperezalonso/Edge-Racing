"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import Image from "next/image";

// Componentes base actualizados sin forwardRef
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

export function LoginForm({
    className,
    ...props
}: React.ComponentProps<"div">) {
    return (
        <div className={cn("flex flex-col gap-6", className)} {...props}>
            <Card className="overflow-hidden bg-[color:var(--racing-gray)]/80 border-gray-800">
                <CardContent className="grid p-0 md:grid-cols-2">
                    <form className="p-6 md:p-8">
                        <div className="flex flex-col gap-6">
                            <div className="flex flex-col items-center text-center">
                                <h1 className="text-2xl font-bold text-white">Bienvenido de nuevo</h1>
                                <p className="text-balance text-gray-400">
                                    Accede a tu cuenta de Edge Racing
                                </p>
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="email" className="text-gray-300">Email</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="m@example.com"
                                    required
                                    className="bg-[color:var(--racing-black)] border-gray-700 text-white"
                                />
                            </div>
                            <div className="grid gap-2">
                                <div className="flex items-center justify-between">
                                    <Label htmlFor="password" className="text-gray-300">Contraseña</Label>
                                    <Link
                                        href="#"
                                        className="text-sm text-[color:var(--motogp-blue)] hover:underline ml-auto underline-offset-2"
                                    >
                                        ¿Olvidaste tu contraseña?
                                    </Link>
                                </div>
                                <Input
                                    id="password"
                                    type="password"
                                    required
                                    className="bg-[color:var(--racing-black)] border-gray-700 text-white"
                                />
                            </div>
                            <Button className="btn-gradient w-full">
                                Iniciar sesión
                            </Button>
                            <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-gray-700">
                                <span className="relative z-10 bg-[color:var(--racing-gray)]/80 px-2 text-gray-400">
                                    O continuar con
                                </span>
                            </div>
                            <div className="grid grid-cols-1 gap-4">
                                <Button variant="outline" className="w-full py-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="size-8">
                                        <path
                                            d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                                            fill="currentColor"
                                        />
                                    </svg>
                                    <span className="sr-only">Login with Google</span>
                                </Button>


                            </div>
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
        </div>
    );
}
