"use client"

import { motion } from "framer-motion"
import { MapPin, Ruler, IndianRupee } from "lucide-react"

const plots = [
    {
        id: 1,
        title: "Sobha City View Plot",
        location: "Near Vadakkumnathan Temple",
        size: "10 Cents",
        price: "₹25 Lakhs",
        image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=1200"
    },
    {
        id: 2,
        title: "Guruvayur East Residential Plot",
        location: "Guruvayur",
        size: "15 Cents",
        price: "₹40 Lakhs",
        image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=1200"
    },
    {
        id: 3,
        title: "Green Valley Land",
        location: "Irinjalakuda",
        size: "5 Acres",
        price: "₹1.2 Crore",
        image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=1200"
    }
]

export default function FeaturedPlots() {

    return (

        <section className="bg-[#FFFFFF] py-20">

            <div className="max-w-7xl mx-auto px-6">

                {/* Header */}

                <div className="text-center mb-14">

                    <p className="text-[#D33C29] tracking-[0.2em] text-sm mb-3">
                        FEATURED PROPERTIES
                    </p>

                    <h2 className="text-4xl font-semibold text-[#0B5C8A]">
                        Available Land Plots
                    </h2>

                    <p className="text-[#0B5C8A]/70 mt-4 max-w-2xl mx-auto">
                        Explore our carefully selected land plots in prime locations across Thrissur.
                        Each property is legally verified and ready for investment.
                    </p>

                </div>

                {/* Property Grid */}

                <div className="grid md:grid-cols-3 gap-8">

                    {plots.map((plot) => (
                        <motion.div
                            key={plot.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5 }}
                            className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition"
                        >

                            {/* Image */}

                            <div className="overflow-hidden">

                                <img
                                    src={plot.image}
                                    className="w-full h-[220px] object-cover hover:scale-105 transition duration-500"
                                />

                            </div>

                            {/* Content */}

                            <div className="p-6">

                                <h3 className="text-xl font-semibold text-[#0B5C8A] mb-3">
                                    {plot.title}
                                </h3>

                                <div className="flex items-center gap-2 text-[#0B5C8A]/70 text-sm mb-2">
                                    <MapPin size={16} />
                                    <span>{plot.location}</span>
                                </div>

                                <div className="flex items-center gap-2 text-[#0B5C8A]/70 text-sm mb-4">
                                    <Ruler size={16} />
                                    <span>{plot.size}</span>
                                </div>

                                <div className="flex items-center justify-between">

                                    <div className="flex items-center gap-1 text-[#D33C29] font-semibold">
                                        <IndianRupee size={16} />
                                        <span>{plot.price}</span>
                                    </div>

                                    <button className="text-sm px-4 py-2 rounded-full bg-[#0B5C8A] text-white hover:bg-[#094b70] transition">
                                        View Details
                                    </button>

                                </div>

                            </div>

                        </motion.div>
                    ))}

                </div>

                {/* View All Button */}

                <div className="text-center mt-12">

                    <button className="px-8 py-3 rounded-full bg-[#D33C29] text-white font-medium hover:opacity-90 transition">
                        View All Properties
                    </button>

                </div>

            </div>

        </section>

    )
}