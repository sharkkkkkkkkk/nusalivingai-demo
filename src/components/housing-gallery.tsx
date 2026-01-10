import Image from "next/image"

export function HousingGallery() {
    const images = [
        {
            src: "/assets/hero-1.png",
            alt: "Konsep Hunian Modern",
            label: "Eksterior Modern"
        },
        {
            src: "/assets/hero-2.png",
            alt: "Desain Ramah Lingkungan",
            label: "Green Living"
        },
        {
            src: "/assets/interior.png",
            alt: "Interior Nyaman",
            label: "Interior Elegan"
        }
    ]

    return (
        <section className="py-20 bg-background" id="gallery">
            <div className="container px-4 md:px-6 mx-auto">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Galeri Hunian</h2>
                    <p className="mt-4 text-muted-foreground max-w-[700px] mx-auto">
                        Inspirasi desain hunian masa depan yang cerdas, hemat energi, dan nyaman.
                    </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {images.map((image, index) => (
                        <div key={index} className="group relative aspect-square overflow-hidden rounded-xl bg-slate-100 shadow-md hover:shadow-xl transition-all duration-300">
                            <Image
                                src={image.src}
                                alt={image.alt}
                                fill
                                className="object-cover transition-transform duration-500 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                                <span className="text-white font-semibold text-lg">{image.label}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
