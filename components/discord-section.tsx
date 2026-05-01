"use client"

import React, { useRef, useEffect, useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

export function DiscordSection() {
  const tabs = [
    {
      value: "communaute",
      label: "Communauté",
      title: "Rejoignez la communauté Discord",
      desc:
        "Accédez à toutes les annonces, événements et discussions exclusives. Notre Discord est le cœur vivant de la communauté.",
      link: { href: "https://discord.gg/newlawl", label: "Rejoindre le Discord →" },
    },
    {
      value: "support",
      label: "Support",
      title: "Support & entraide 24/7",
      desc:
        "Posez vos questions, trouvez de l'aide rapidement grâce à notre staff et à la solidarité des membres. Un problème ? On est là pour vous !",
      link: { href: "https://discord.gg/newlawl", label: "Obtenir de l'aide →" },
    },
    {
      value: "evenements",
      label: "Événements",
      title: "Événements et giveaways",
      desc:
        "Participez à des événements exclusifs, gagnez des récompenses et vivez des moments inoubliables avec la communauté.",
      link: { href: "https://discord.gg/newlawl", label: "Voir les événements →" },
    },
  ];

  return (
    <section id="discord" className="py-32 px-8">
      <div className="container mx-auto max-w-7xl px-8 text-center flex flex-col items-center justify-center">
        <div className="text-center">
          <h2 className="text-5xl md:text-6xl font-extralight text-white mb-6 tracking-tight">
            Notre
            <br />
          <span className="text-white font-medium">Discord</span>
          </h2>
        </div>
        <div className="flex flex-col items-center justify-center">
          <Tabs defaultValue={tabs[0].value} className="w-full max-w-2xl">
            <TabsList className="mb-3 rounded-full bg-white/5 backdrop-blur-sm gap-2">
              {tabs.map((tab) => (
                <TabsTrigger key={tab.value} value={tab.value} className="text-white data-[state=active]:bg-neutral-600 rounded-full data-[state=active]:text-white">
                  {tab.label}
                </TabsTrigger>
              ))}
            </TabsList>
            {tabs.map((tab) => (
              <TabsContent key={tab.value} value={tab.value} className="bg-white/5 rounded-2xl p-10 text-center">
                <h3 className="text-2xl md:text-3xl font-medium mb-4 text-white">{tab.title}</h3>
                <p className="font-light text-lg leading-relaxed mb-6 text-white/80">{tab.desc}</p>
                <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
          <button className="group relative overflow-hidden bg-white text-black px-12 py-4 rounded-full text-sm font-medium transition-all duration-500 hover:scale-105">
                  <span className="relative z-10 group-hover:text-white transition-colors duration-300">{tab.link.label}</span>
                  <div className="absolute inset-0 bg-neutral-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
                </button>
              </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </div>
    </section>
  );
} 