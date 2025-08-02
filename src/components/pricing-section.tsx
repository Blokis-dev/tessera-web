import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Check, Star } from "lucide-react"

const plans = [
	{
		name: "Starter",
		price: "Gratis",
		description: "Perfect para comenzar",
		tokens: "50 tokens incluidos",
		features: [
			"50 certificados gratis",
			"Validación básica",
			"Soporte por email",
			"Dashboard básico",
		],
		cta: "Comenzar Gratis",
		popular: false,
	},
	{
		name: "Professional",
		price: "$29",
		period: "/mes",
		description: "Para instituciones medianas",
		tokens: "500 tokens mensuales",
		features: [
			"500 certificados/mes",
			"Validación avanzada",
			"Soporte prioritario",
			"Analytics completos",
			"API access",
			"Branding personalizado",
		],
		cta: "Comenzar Prueba",
		popular: true,
	},
	{
		name: "Enterprise",
		price: "Personalizado",
		description: "Para grandes organizaciones",
		tokens: "Tokens ilimitados",
		features: [
			"Certificados ilimitados",
			"Validación premium",
			"Soporte 24/7",
			"Analytics avanzados",
			"API completa",
			"Integración personalizada",
			"Gerente de cuenta dedicado",
		],
		cta: "Contactar Ventas",
		popular: false,
	},
]

export function PricingSection() {
	return (
		<section id="pricing" className="py-20 lg:py-32">
			<div className="container mx-auto px-4 sm:px-6 lg:px-8">
				<div className="text-center space-y-4 mb-16">
					<h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold">
						Planes que se adaptan a{" "}
						<span
							className="bg-clip-text text-transparent"
							style={{
								background:
									"linear-gradient(90deg, var(--primary), var(--accent))",
								WebkitBackgroundClip: "text",
								backgroundClip: "text",
							}}
						>
							tu institución
						</span>
					</h2>
					<p className="text-xl text-muted-foreground max-w-3xl mx-auto">
						Comienza gratis con 50 tokens y escala según tus necesidades. 1
						certificado = 1 token.
					</p>
				</div>

				<div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
					{plans.map((plan, index) => (
						<Card
							key={index}
							className={`relative ${
								plan.popular
									? "border-2"
									: "border-0"
							} shadow-lg hover:shadow-xl transition-all duration-300`}
							style={
								plan.popular
									? { borderColor: "var(--primary)" }
									: {}
							}
						>
							{plan.popular && (
								<div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
									<div
										className="px-4 py-1 rounded-full text-sm font-medium flex items-center"
										style={{
											background:
												"linear-gradient(90deg, var(--primary), var(--accent))",
											color: "white",
										}}
									>
										<Star className="h-4 w-4 mr-1" />
										Más Popular
									</div>
								</div>
							)}

							<CardHeader className="text-center pb-8">
								<CardTitle className="text-2xl">{plan.name}</CardTitle>
								<div className="space-y-2">
									<div className="flex items-baseline justify-center">
										<span className="text-4xl font-bold">{plan.price}</span>
										{plan.period && (
											<span className="text-muted-foreground ml-1">
												{plan.period}
											</span>
										)}
									</div>
									<CardDescription className="text-base">
										{plan.description}
									</CardDescription>
									<div
										className="inline-block px-3 py-1 rounded-full text-sm font-medium"
										style={{
											background:
												"linear-gradient(90deg, var(--primary)/10, var(--accent)/10)",
											color: "var(--primary)",
										}}
									>
										{plan.tokens}
									</div>
								</div>
							</CardHeader>

							<CardContent className="space-y-6">
								<ul className="space-y-3">
									{plan.features.map((feature, featureIndex) => (
										<li key={featureIndex} className="flex items-center">
											<Check className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
											<span className="text-sm">{feature}</span>
										</li>
									))}
								</ul>

								<Button
									className="w-full"
									size="lg"
									style={
										plan.popular
											? {
													background:
														"linear-gradient(90deg, var(--primary), var(--accent))",
													color: "white",
											  }
											: {
													borderColor: "var(--primary)",
													color: "var(--primary)",
													background: "transparent",
											  }
									}
								>
									{plan.cta}
								</Button>
							</CardContent>
						</Card>
					))}
				</div>

				<div className="text-center mt-12">
					<p className="text-muted-foreground">
						¿Necesitas más tokens? Puedes comprar paquetes adicionales en
						cualquier momento.
					</p>
				</div>
			</div>
		</section>
	)
}
