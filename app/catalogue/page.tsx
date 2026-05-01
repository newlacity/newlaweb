"use client";

import React, { useState, useMemo } from "react";
import {
  Search,
  Filter,
  Car,
  Truck,
  Plane,
  DollarSign,
  Star,
  Bike,
  X,
  Zap,
  Gauge,
  Users,
  Award,
} from "lucide-react";

const vehicles = [
  // Supercars
  {
    id: 1,
    name: "Adder",
    category: "Super",
    price: 1000000,
    brand: "Truffade",
    seats: 2,
    topSpeed: 350,
    acceleration: 9.5,
    handling: 8.5,
    image: "https://docs.fivem.net/vehicles/adder.webp",
  },
  {
    id: 2,
    name: "Zentorno",
    category: "Super",
    price: 725000,
    brand: "Pegassi",
    seats: 2,
    topSpeed: 345,
    acceleration: 9.3,
    handling: 8.8,
    image: "https://docs.fivem.net/vehicles/zentorno.webp",
  },
  {
    id: 3,
    name: "T20",
    category: "Super",
    price: 2200000,
    brand: "Progen",
    seats: 2,
    topSpeed: 355,
    acceleration: 9.7,
    handling: 9.0,
    image: "https://docs.fivem.net/vehicles/t20.webp",
  },
  {
    id: 4,
    name: "Osiris",
    category: "Super",
    price: 1950000,
    brand: "Pegassi",
    seats: 2,
    topSpeed: 350,
    acceleration: 9.4,
    handling: 8.9,
    image: "https://docs.fivem.net/vehicles/osiris.webp",
  },
  {
    id: 5,
    name: "Entity XF",
    category: "Super",
    price: 825000,
    brand: "Overflod",
    seats: 2,
    topSpeed: 340,
    acceleration: 9.2,
    handling: 8.7,
    image: "https://docs.fivem.net/vehicles/entityxf.webp",
  },
  {
    id: 6,
    name: "X80 Proto",
    category: "Super",
    price: 2700000,
    brand: "Grotti",
    seats: 2,
    topSpeed: 360,
    acceleration: 9.8,
    handling: 9.2,
    image: "https://docs.fivem.net/vehicles/x80proto.webp",
  },
  {
    id: 7,
    name: "Reaper",
    category: "Super",
    price: 1595000,
    brand: "Pegassi",
    seats: 2,
    topSpeed: 345,
    acceleration: 9.3,
    handling: 8.6,
    image: "https://docs.fivem.net/vehicles/reaper.webp",
  },
  {
    id: 8,
    name: "FMJ",
    category: "Super",
    price: 1750000,
    brand: "Vapid",
    seats: 2,
    topSpeed: 350,
    acceleration: 9.4,
    handling: 8.8,
    image: "https://docs.fivem.net/vehicles/fmj.webp",
  },
  {
    id: 9,
    name: "Nero",
    category: "Super",
    price: 1400000,
    brand: "Truffade",
    seats: 2,
    topSpeed: 345,
    acceleration: 9.2,
    handling: 8.7,
    image: "https://docs.fivem.net/vehicles/nero.webp",
  },
  {
    id: 10,
    name: "Itali GTB",
    category: "Super",
    price: 1950000,
    brand: "Progen",
    seats: 2,
    topSpeed: 350,
    acceleration: 9.5,
    handling: 8.9,
    image: "https://docs.fivem.net/vehicles/italigtb.webp",
  },
  {
    id: 11,
    name: "Tempesta",
    category: "Super",
    price: 1320000,
    brand: "Pegassi",
    seats: 2,
    topSpeed: 345,
    acceleration: 9.3,
    handling: 8.8,
    image: "https://docs.fivem.net/vehicles/tempesta.webp",
  },
  {
    id: 12,
    name: "Vagner",
    category: "Super",
    price: 1535000,
    brand: "Dewbauchee",
    seats: 2,
    topSpeed: 355,
    acceleration: 9.6,
    handling: 9.1,
    image: "https://docs.fivem.net/vehicles/vagner.webp",
  },
  {
    id: 13,
    name: "Autarch",
    category: "Super",
    price: 1955000,
    brand: "Overflod",
    seats: 2,
    topSpeed: 350,
    acceleration: 9.4,
    handling: 8.9,
    image: "https://docs.fivem.net/vehicles/autarch.webp",
  },
  {
    id: 14,
    name: "Tezeract",
    category: "Super",
    price: 2200000,
    brand: "Pegassi",
    seats: 2,
    topSpeed: 340,
    acceleration: 9.8,
    handling: 9.0,
    image: "https://docs.fivem.net/vehicles/tezeract.webp",
  },
  {
    id: 15,
    name: "Tyrant",
    category: "Super",
    price: 2000000,
    brand: "Överflöd",
    seats: 2,
    topSpeed: 345,
    acceleration: 9.3,
    handling: 8.7,
    image: "https://docs.fivem.net/vehicles/tyrant.webp",
  },

  // Sports
  {
    id: 16,
    name: "Sultan RS",
    category: "Sports",
    price: 150000,
    brand: "Karin",
    seats: 4,
    topSpeed: 280,
    acceleration: 8.5,
    handling: 8.0,
    image: "https://docs.fivem.net/vehicles/sultanrs.webp",
  },
  {
    id: 17,
    name: "Elegy RH8",
    category: "Sports",
    price: 95000,
    brand: "Annis",
    seats: 4,
    topSpeed: 275,
    acceleration: 8.3,
    handling: 8.2,
    image: "https://docs.fivem.net/vehicles/elegy.webp",
  },
  {
    id: 18,
    name: "Feltzer",
    category: "Sports",
    price: 130000,
    brand: "Benefactor",
    seats: 2,
    topSpeed: 285,
    acceleration: 8.6,
    handling: 8.1,
    image: "https://docs.fivem.net/vehicles/feltzer3.webp",
  },
  {
    id: 19,
    name: "Comet",
    category: "Sports",
    price: 100000,
    brand: "Pfister",
    seats: 2,
    topSpeed: 270,
    acceleration: 8.4,
    handling: 8.3,
    image: "https://docs.fivem.net/vehicles/comet2.webp",
  },
  {
    id: 20,
    name: "Carbonizzare",
    category: "Sports",
    price: 195000,
    brand: "Grotti",
    seats: 2,
    topSpeed: 290,
    acceleration: 8.7,
    handling: 8.4,
    image: "https://docs.fivem.net/vehicles/carbonizzare.webp",
  },
  {
    id: 21,
    name: "Banshee",
    category: "Sports",
    price: 105000,
    brand: "Bravado",
    seats: 2,
    topSpeed: 275,
    acceleration: 8.2,
    handling: 8.0,
    image: "https://docs.fivem.net/vehicles/banshee.webp",
  },
  {
    id: 22,
    name: "Buffalo",
    category: "Sports",
    price: 25000,
    brand: "Bravado",
    seats: 4,
    topSpeed: 260,
    acceleration: 7.8,
    handling: 7.5,
    image: "https://docs.fivem.net/vehicles/buffalo.webp",
  },
  {
    id: 23,
    name: "Fusilade",
    category: "Sports",
    price: 35000,
    brand: "Schyster",
    seats: 4,
    topSpeed: 265,
    acceleration: 7.9,
    handling: 7.6,
    image: "https://docs.fivem.net/vehicles/fusilade.webp",
  },
  {
    id: 24,
    name: "Rapid GT",
    category: "Sports",
    price: 132000,
    brand: "Dewbauchee",
    seats: 2,
    topSpeed: 285,
    acceleration: 8.5,
    handling: 8.2,
    image: "https://docs.fivem.net/vehicles/rapidgt.webp",
  },
  {
    id: 25,
    name: "9F",
    category: "Sports",
    price: 120000,
    brand: "Obey",
    seats: 2,
    topSpeed: 280,
    acceleration: 8.3,
    handling: 8.1,
    image: "https://docs.fivem.net/vehicles/ninef.webp",
  },
  {
    id: 26,
    name: "Alpha",
    category: "Sports",
    price: 45000,
    brand: "Albany",
    seats: 4,
    topSpeed: 270,
    acceleration: 8.0,
    handling: 7.8,
    image: "https://docs.fivem.net/vehicles/alpha.webp",
  },
  {
    id: 27,
    name: "Blista",
    category: "Sports",
    price: 8000,
    brand: "Dinka",
    seats: 2,
    topSpeed: 220,
    acceleration: 6.5,
    handling: 7.0,
    image: "https://docs.fivem.net/vehicles/blista.webp",
  },
  {
    id: 28,
    name: "Brioso R/A",
    category: "Sports",
    price: 15000,
    brand: "Grotti",
    seats: 2,
    topSpeed: 240,
    acceleration: 7.0,
    handling: 7.5,
    image: "https://docs.fivem.net/vehicles/brioso.webp",
  },
  {
    id: 29,
    name: "Dilettante",
    category: "Sports",
    price: 15000,
    brand: "Karin",
    seats: 4,
    topSpeed: 200,
    acceleration: 6.0,
    handling: 6.5,
    image: "https://docs.fivem.net/vehicles/dilettante.webp",
  },
  {
    id: 30,
    name: "Issi",
    category: "Sports",
    price: 10000,
    brand: "Weeny",
    seats: 2,
    topSpeed: 210,
    acceleration: 6.2,
    handling: 6.8,
    image: "https://docs.fivem.net/vehicles/issi2.webp",
  },

  // Muscle
  {
    id: 31,
    name: "Dominator",
    category: "Muscle",
    price: 35000,
    brand: "Vapid",
    seats: 4,
    topSpeed: 250,
    acceleration: 7.5,
    handling: 6.5,
    image: "https://docs.fivem.net/vehicles/dominator.webp",
  },
  {
    id: 32,
    name: "Phoenix",
    category: "Muscle",
    price: 25000,
    brand: "Imponte",
    seats: 2,
    topSpeed: 245,
    acceleration: 7.3,
    handling: 6.8,
    image: "https://docs.fivem.net/vehicles/phoenix.webp",
  },
  {
    id: 33,
    name: "Gauntlet",
    category: "Muscle",
    price: 32000,
    brand: "Bravado",
    seats: 4,
    topSpeed: 255,
    acceleration: 7.6,
    handling: 6.7,
    image: "https://docs.fivem.net/vehicles/gauntlet.webp",
  },
  {
    id: 34,
    name: "Dukes",
    category: "Muscle",
    price: 28000,
    brand: "Imponte",
    seats: 4,
    topSpeed: 240,
    acceleration: 7.2,
    handling: 6.6,
    image: "https://docs.fivem.net/vehicles/dukes.webp",
  },
  {
    id: 35,
    name: "Blade",
    category: "Muscle",
    price: 160000,
    brand: "Vapid",
    seats: 4,
    topSpeed: 235,
    acceleration: 7.0,
    handling: 6.9,
    image: "https://docs.fivem.net/vehicles/blade.webp",
  },
  {
    id: 37,
    name: "Picador",
    category: "Muscle",
    price: 18000,
    brand: "Cheval",
    seats: 2,
    topSpeed: 225,
    acceleration: 6.5,
    handling: 6.2,
    image: "https://docs.fivem.net/vehicles/picador.webp",
  },
  {
    id: 38,
    name: "Rat-Loader",
    category: "Muscle",
    price: 6000,
    brand: "Bravado",
    seats: 2,
    topSpeed: 200,
    acceleration: 5.8,
    handling: 5.5,
    image: "https://docs.fivem.net/vehicles/ratloader.webp",
  },
  {
    id: 39,
    name: "Ruiner",
    category: "Muscle",
    price: 15000,
    brand: "Imponte",
    seats: 2,
    topSpeed: 235,
    acceleration: 7.0,
    handling: 6.6,
    image: "https://docs.fivem.net/vehicles/ruiner.webp",
  },
  {
    id: 40,
    name: "Sabre Turbo",
    category: "Muscle",
    price: 15000,
    brand: "Declasse",
    seats: 4,
    topSpeed: 245,
    acceleration: 7.3,
    handling: 6.8,
    image: "https://docs.fivem.net/vehicles/sabregt.webp",
  },

  // Sedans
  {
    id: 41,
    name: "Oracle",
    category: "Sedans",
    price: 22000,
    brand: "Übermacht",
    seats: 4,
    topSpeed: 200,
    acceleration: 6.5,
    handling: 7.0,
    image: "https://docs.fivem.net/vehicles/oracle.webp",
  },
  {
    id: 42,
    name: "Felon",
    category: "Sedans",
    price: 40000,
    brand: "Lampadati",
    seats: 4,
    topSpeed: 210,
    acceleration: 6.8,
    handling: 7.2,
    image: "https://docs.fivem.net/vehicles/felon.webp",
  },
  {
    id: 43,
    name: "Cognoscenti",
    category: "Sedans",
    price: 55000,
    brand: "Enus",
    seats: 4,
    topSpeed: 195,
    acceleration: 6.3,
    handling: 7.5,
    image: "https://docs.fivem.net/vehicles/cognoscenti.webp",
  },
  {
    id: 44,
    name: "Schafter",
    category: "Sedans",
    price: 35000,
    brand: "Benefactor",
    seats: 4,
    topSpeed: 205,
    acceleration: 6.7,
    handling: 7.1,
    image: "https://docs.fivem.net/vehicles/schafter2.webp",
  },
  {
    id: 45,
    name: "Tailgater",
    category: "Sedans",
    price: 30000,
    brand: "Obey",
    seats: 4,
    topSpeed: 200,
    acceleration: 6.4,
    handling: 7.3,
    image: "https://docs.fivem.net/vehicles/tailgater.webp",
  },
  {
    id: 46,
    name: "Asterope",
    category: "Sedans",
    price: 15000,
    brand: "Karin",
    seats: 4,
    topSpeed: 190,
    acceleration: 6.0,
    handling: 6.8,
    image: "https://docs.fivem.net/vehicles/asterope.webp",
  },
  {
    id: 47,
    name: "Premier",
    category: "Sedans",
    price: 12000,
    brand: "Declasse",
    seats: 4,
    topSpeed: 185,
    acceleration: 5.8,
    handling: 6.5,
    image: "https://docs.fivem.net/vehicles/premier.webp",
  },
  {
    id: 48,
    name: "Primo",
    category: "Sedans",
    price: 9000,
    brand: "Declasse",
    seats: 4,
    topSpeed: 180,
    acceleration: 5.5,
    handling: 6.2,
    image: "https://docs.fivem.net/vehicles/primo.webp",
  },
  {
    id: 49,
    name: "Regina",
    category: "Sedans",
    price: 8000,
    brand: "Dundreary",
    seats: 4,
    topSpeed: 175,
    acceleration: 5.3,
    handling: 6.0,
    image: "https://docs.fivem.net/vehicles/regina.webp",
  },
  {
    id: 50,
    name: "Stratum",
    category: "Sedans",
    price: 10000,
    brand: "Zirconium",
    seats: 4,
    topSpeed: 185,
    acceleration: 5.7,
    handling: 6.3,
    image: "https://docs.fivem.net/vehicles/stratum.webp",
  },

  // SUVs
  {
    id: 51,
    name: "Baller",
    category: "SUVs",
    price: 90000,
    brand: "Gallivanter",
    seats: 4,
    topSpeed: 180,
    acceleration: 6.0,
    handling: 6.5,
    image: "https://docs.fivem.net/vehicles/baller.webp",
  },
  {
    id: 52,
    name: "Cavalcade",
    category: "SUVs",
    price: 12000,
    brand: "Albany",
    seats: 4,
    topSpeed: 170,
    acceleration: 5.8,
    handling: 6.2,
    image: "https://docs.fivem.net/vehicles/cavalcade.webp",
  },
  {
    id: 53,
    name: "Dubsta",
    category: "SUVs",
    price: 70000,
    brand: "Benefactor",
    seats: 4,
    topSpeed: 175,
    acceleration: 5.9,
    handling: 6.4,
    image: "https://docs.fivem.net/vehicles/dubsta.webp",
  },
  {
    id: 54,
    name: "Granger",
    category: "SUVs",
    price: 320000,
    brand: "Declasse",
    seats: 4,
    topSpeed: 185,
    acceleration: 6.1,
    handling: 6.3,
    image: "https://docs.fivem.net/vehicles/granger.webp",
  },
  {
    id: 55,
    name: "Habanero",
    category: "SUVs",
    price: 20000,
    brand: "Emperor",
    seats: 4,
    topSpeed: 165,
    acceleration: 5.7,
    handling: 6.1,
    image: "https://docs.fivem.net/vehicles/habanero.webp",
  },
  {
    id: 56,
    name: "Mesa",
    category: "SUVs",
    price: 12000,
    brand: "Canis",
    seats: 4,
    topSpeed: 160,
    acceleration: 5.5,
    handling: 5.8,
    image: "https://docs.fivem.net/vehicles/mesa.webp",
  },
  {
    id: 57,
    name: "Patriot",
    category: "SUVs",
    price: 55000,
    brand: "Mammoth",
    seats: 4,
    topSpeed: 170,
    acceleration: 5.8,
    handling: 6.0,
    image: "https://docs.fivem.net/vehicles/patriot.webp",
  },
  {
    id: 58,
    name: "Radius",
    category: "SUVs",
    price: 15000,
    brand: "Vapid",
    seats: 4,
    topSpeed: 165,
    acceleration: 5.6,
    handling: 5.9,
    image: "https://docs.fivem.net/vehicles/radi.webp",
  },
  {
    id: 59,
    name: "Rocoto",
    category: "SUVs",
    price: 85000,
    brand: "Obey",
    seats: 4,
    topSpeed: 175,
    acceleration: 6.0,
    handling: 6.2,
    image: "https://docs.fivem.net/vehicles/rocoto.webp",
  },
  {
    id: 60,
    name: "Seminole",
    category: "SUVs",
    price: 25000,
    brand: "Canis",
    seats: 4,
    topSpeed: 160,
    acceleration: 5.4,
    handling: 5.7,
    image: "https://docs.fivem.net/vehicles/seminole.webp",
  },

  // Motorcycles
  {
    id: 61,
    name: "Akuma",
    category: "Motorcycles",
    price: 55000,
    brand: "Dinka",
    seats: 2,
    topSpeed: 320,
    acceleration: 9.0,
    handling: 8.8,
    image: "https://docs.fivem.net/vehicles/akuma.webp",
  },
  {
    id: 62,
    name: "Bati 801",
    category: "Motorcycles",
    price: 15000,
    brand: "Dinka",
    seats: 2,
    topSpeed: 315,
    acceleration: 8.9,
    handling: 8.7,
    image: "https://docs.fivem.net/vehicles/bati.webp",
  },
  {
    id: 63,
    name: "Double T",
    category: "Motorcycles",
    price: 28000,
    brand: "Dinka",
    seats: 2,
    topSpeed: 310,
    acceleration: 8.8,
    handling: 8.6,
    image: "https://docs.fivem.net/vehicles/double.webp",
  },
  {
    id: 64,
    name: "Faggio",
    category: "Motorcycles",
    price: 2000,
    brand: "Pegassi",
    seats: 2,
    topSpeed: 120,
    acceleration: 4.0,
    handling: 7.0,
    image: "https://docs.fivem.net/vehicles/faggio.webp",
  },
  {
    id: 65,
    name: "Hakuchou",
    category: "Motorcycles",
    price: 82000,
    brand: "Shitzu",
    seats: 2,
    topSpeed: 325,
    acceleration: 9.1,
    handling: 8.9,
    image: "https://docs.fivem.net/vehicles/hakuchou.webp",
  },
  {
    id: 66,
    name: "PCJ 600",
    category: "Motorcycles",
    price: 15000,
    brand: "Shitzu",
    seats: 2,
    topSpeed: 305,
    acceleration: 8.7,
    handling: 8.5,
    image: "https://docs.fivem.net/vehicles/pcj.webp",
  },
  {
    id: 67,
    name: "Ruffian",
    category: "Motorcycles",
    price: 13000,
    brand: "Pegassi",
    seats: 2,
    topSpeed: 300,
    acceleration: 8.6,
    handling: 8.4,
    image: "https://docs.fivem.net/vehicles/ruffian.webp",
  },
  {
    id: 68,
    name: "Sanchez",
    category: "Motorcycles",
    price: 8000,
    brand: "Maibatsu",
    seats: 2,
    topSpeed: 280,
    acceleration: 8.2,
    handling: 8.0,
    image: "https://docs.fivem.net/vehicles/sanchez.webp",
  },
  {
    id: 69,
    name: "Sovereign",
    category: "Motorcycles",
    price: 22000,
    brand: "Western",
    seats: 2,
    topSpeed: 290,
    acceleration: 8.4,
    handling: 8.2,
    image: "https://docs.fivem.net/vehicles/sovereign.webp",
  },
  {
    id: 70,
    name: "Vader",
    category: "Motorcycles",
    price: 7200,
    brand: "Shitzu",
    seats: 2,
    topSpeed: 295,
    acceleration: 8.5,
    handling: 8.3,
    image: "https://docs.fivem.net/vehicles/vader.webp",
  },

  // Commercial
  {
    id: 71,
    name: "Benson",
    category: "Commercial",
    price: 135000,
    brand: "Vapid",
    seats: 2,
    topSpeed: 140,
    acceleration: 4.5,
    handling: 5.5,
    image: "https://docs.fivem.net/vehicles/benson.webp",
  },
  {
    id: 72,
    name: "Boxville",
    category: "Commercial",
    price: 100000,
    brand: "Brute",
    seats: 2,
    topSpeed: 130,
    acceleration: 4.2,
    handling: 5.3,
    image: "https://docs.fivem.net/vehicles/boxville.webp",
  },
  {
    id: 73,
    name: "Mule",
    category: "Commercial",
    price: 20000,
    brand: "Maibatsu",
    seats: 2,
    topSpeed: 125,
    acceleration: 4.0,
    handling: 5.2,
    image: "https://docs.fivem.net/vehicles/mule.webp",
  },
  {
    id: 74,
    name: "Packer",
    category: "Commercial",
    price: 150000,
    brand: "MTL",
    seats: 2,
    topSpeed: 135,
    acceleration: 4.3,
    handling: 5.4,
    image: "https://docs.fivem.net/vehicles/packer.webp",
  },
  {
    id: 75,
    name: "Phantom",
    category: "Commercial",
    price: 150000,
    brand: "JoBuilt",
    seats: 2,
    topSpeed: 145,
    acceleration: 4.6,
    handling: 5.6,
    image: "https://docs.fivem.net/vehicles/phantom.webp",
  },
  {
    id: 76,
    name: "Pounder",
    category: "Commercial",
    price: 150000,
    brand: "MTL",
    seats: 2,
    topSpeed: 140,
    acceleration: 4.4,
    handling: 5.5,
    image: "https://docs.fivem.net/vehicles/pounder.webp",
  },
  {
    id: 77,
    name: "Speedo",
    category: "Commercial",
    price: 33000,
    brand: "Vapid",
    seats: 2,
    topSpeed: 150,
    acceleration: 5.0,
    handling: 5.8,
    image: "https://docs.fivem.net/vehicles/speedo.webp",
  },
  {
    id: 78,
    name: "Surge",
    category: "Commercial",
    price: 38000,
    brand: "Cheval",
    seats: 4,
    topSpeed: 155,
    acceleration: 5.2,
    handling: 6.0,
    image: "https://docs.fivem.net/vehicles/surge.webp",
  },
  {
    id: 79,
    name: "Youga",
    category: "Commercial",
    price: 25000,
    brand: "Bravado",
    seats: 2,
    topSpeed: 145,
    acceleration: 4.8,
    handling: 5.7,
    image: "https://docs.fivem.net/vehicles/youga.webp",
  },
  {
    id: 80,
    name: "Youga Classic",
    category: "Commercial",
    price: 20000,
    brand: "Vapid",
    seats: 2,
    topSpeed: 140,
    acceleration: 4.6,
    handling: 5.5,
    image: "https://docs.fivem.net/vehicles/youga2.webp",
  },

  // Compacts
  {
    id: 81,
    name: "Blista",
    category: "Compacts",
    price: 8000,
    brand: "Dinka",
    seats: 2,
    topSpeed: 220,
    acceleration: 6.5,
    handling: 7.0,
    image: "https://docs.fivem.net/vehicles/blista.webp",
  },
  {
    id: 82,
    name: "Brioso R/A",
    category: "Compacts",
    price: 15000,
    brand: "Grotti",
    seats: 2,
    topSpeed: 240,
    acceleration: 7.0,
    handling: 7.5,
    image: "https://docs.fivem.net/vehicles/brioso.webp",
  },
  {
    id: 83,
    name: "Issi",
    category: "Compacts",
    price: 10000,
    brand: "Weeny",
    seats: 2,
    topSpeed: 210,
    acceleration: 6.2,
    handling: 6.8,
    image: "https://docs.fivem.net/vehicles/issi2.webp",
  },
  {
    id: 84,
    name: "Panto",
    category: "Compacts",
    price: 8200,
    brand: "Benefactor",
    seats: 2,
    topSpeed: 200,
    acceleration: 6.0,
    handling: 6.5,
    image: "https://docs.fivem.net/vehicles/panto.webp",
  },
  {
    id: 85,
    name: "Prairie",
    category: "Compacts",
    price: 12000,
    brand: "Bollokan",
    seats: 4,
    topSpeed: 215,
    acceleration: 6.3,
    handling: 6.9,
    image: "https://docs.fivem.net/vehicles/prairie.webp",
  },
  {
    id: 86,
    name: "Rhapsody",
    category: "Compacts",
    price: 10000,
    brand: "Declasse",
    seats: 4,
    topSpeed: 205,
    acceleration: 6.1,
    handling: 6.7,
    image: "https://docs.fivem.net/vehicles/rhapsody.webp",
  },

  // Coupes
  {
    id: 87,
    name: "Cognoscenti Cabrio",
    category: "Coupes",
    price: 68000,
    brand: "Enus",
    seats: 4,
    topSpeed: 200,
    acceleration: 6.5,
    handling: 7.2,
    image: "https://docs.fivem.net/vehicles/cognoscenti2.webp",
  },
  {
    id: 88,
    name: "Exemplar",
    category: "Coupes",
    price: 55000,
    brand: "Dewbauchee",
    seats: 4,
    topSpeed: 210,
    acceleration: 6.8,
    handling: 7.4,
    image: "https://docs.fivem.net/vehicles/exemplar.webp",
  },
  {
    id: 89,
    name: "F620",
    category: "Coupes",
    price: 40000,
    brand: "Ocelot",
    seats: 4,
    topSpeed: 215,
    acceleration: 7.0,
    handling: 7.5,
    image: "https://docs.fivem.net/vehicles/f620.webp",
  },
  {
    id: 90,
    name: "Felon",
    category: "Coupes",
    price: 40000,
    brand: "Lampadati",
    seats: 4,
    topSpeed: 210,
    acceleration: 6.8,
    handling: 7.2,
    image: "https://docs.fivem.net/vehicles/felon.webp",
  },
  {
    id: 91,
    name: "Jackal",
    category: "Coupes",
    price: 38000,
    brand: "Ocelot",
    seats: 4,
    topSpeed: 205,
    acceleration: 6.6,
    handling: 7.1,
    image: "https://docs.fivem.net/vehicles/jackal.webp",
  },
  {
    id: 92,
    name: "Oracle",
    category: "Coupes",
    price: 22000,
    brand: "Übermacht",
    seats: 4,
    topSpeed: 200,
    acceleration: 6.5,
    handling: 7.0,
    image: "https://docs.fivem.net/vehicles/oracle.webp",
  },
  {
    id: 93,
    name: "Sentinel",
    category: "Coupes",
    price: 35000,
    brand: "Übermacht",
    seats: 4,
    topSpeed: 205,
    acceleration: 6.7,
    handling: 7.3,
    image: "https://docs.fivem.net/vehicles/sentinel.webp",
  },
  {
    id: 94,
    name: "Windsor",
    category: "Coupes",
    price: 80000,
    brand: "Enus",
    seats: 4,
    topSpeed: 220,
    acceleration: 7.2,
    handling: 7.6,
    image: "https://docs.fivem.net/vehicles/windsor.webp",
  },
  {
    id: 95,
    name: "Zion",
    category: "Coupes",
    price: 45000,
    brand: "Übermacht",
    seats: 4,
    topSpeed: 210,
    acceleration: 6.9,
    handling: 7.4,
    image: "https://docs.fivem.net/vehicles/zion.webp",
  },
  {
    id: 96,
    name: "Zion Cabrio",
    category: "Coupes",
    price: 45000,
    brand: "Übermacht",
    seats: 4,
    topSpeed: 210,
    acceleration: 6.9,
    handling: 7.4,
    image: "https://docs.fivem.net/vehicles/zion2.webp",
  },

  // Off-road
  {
    id: 97,
    name: "Bifta",
    category: "Off-road",
    price: 75000,
    brand: "Dinka",
    seats: 2,
    topSpeed: 280,
    acceleration: 8.0,
    handling: 7.5,
    image: "https://docs.fivem.net/vehicles/bifta.webp",
  },
  {
    id: 98,
    name: "Blazer",
    category: "Off-road",
    price: 15000,
    brand: "Nagasaki",
    seats: 2,
    topSpeed: 250,
    acceleration: 7.5,
    handling: 7.0,
    image: "https://docs.fivem.net/vehicles/blazer.webp",
  },
  {
    id: 99,
    name: "Bodhi",
    category: "Off-road",
    price: 25000,
    brand: "Canis",
    seats: 4,
    topSpeed: 180,
    acceleration: 6.0,
    handling: 6.5,
    image: "https://docs.fivem.net/vehicles/bodhi2.webp",
  },
  {
    id: 100,
    name: "Dune Buggy",
    category: "Off-road",
    price: 20000,
    brand: "BF",
    seats: 2,
    topSpeed: 260,
    acceleration: 7.8,
    handling: 7.2,
    image: "https://docs.fivem.net/vehicles/dune.webp",
  },
  {
    id: 101,
    name: "Dune Loader",
    category: "Off-road",
    price: 15000,
    brand: "BF",
    seats: 2,
    topSpeed: 150,
    acceleration: 5.0,
    handling: 5.5,
    image: "https://docs.fivem.net/vehicles/dloader.webp",
  },
  {
    id: 103,
    name: "Injection",
    category: "Off-road",
    price: 40000,
    brand: "BF",
    seats: 2,
    topSpeed: 270,
    acceleration: 8.2,
    handling: 7.8,
    image: "https://docs.fivem.net/vehicles/bfinjection.webp",
  },
  {
    id: 104,
    name: "Kalahari",
    category: "Off-road",
    price: 45000,
    brand: "Canis",
    seats: 2,
    topSpeed: 240,
    acceleration: 7.2,
    handling: 6.8,
    image: "https://docs.fivem.net/vehicles/kalahari.webp",
  },
  {
    id: 105,
    name: "Mesa",
    category: "Off-road",
    price: 12000,
    brand: "Canis",
    seats: 4,
    topSpeed: 160,
    acceleration: 5.5,
    handling: 5.8,
    image: "https://docs.fivem.net/vehicles/mesa.webp",
  },
  {
    id: 106,
    name: "Rancher XL",
    category: "Off-road",
    price: 35000,
    brand: "Declasse",
    seats: 4,
    topSpeed: 170,
    acceleration: 5.8,
    handling: 6.2,
    image: "https://docs.fivem.net/vehicles/rancherxl.webp",
  },

  // Vans
  {
    id: 107,
    name: "Bison",
    category: "Vans",
    price: 45000,
    brand: "Bravado",
    seats: 4,
    topSpeed: 160,
    acceleration: 5.5,
    handling: 5.8,
    image: "https://docs.fivem.net/vehicles/bison.webp",
  },
  {
    id: 108,
    name: "Bobcat XL",
    category: "Vans",
    price: 22000,
    brand: "Vapid",
    seats: 4,
    topSpeed: 150,
    acceleration: 5.2,
    handling: 5.5,
    image: "https://docs.fivem.net/vehicles/bobcatxl.webp",
  },
  {
    id: 109,
    name: "Burrito",
    category: "Vans",
    price: 19000,
    brand: "Declasse",
    seats: 4,
    topSpeed: 155,
    acceleration: 5.3,
    handling: 5.6,
    image: "https://docs.fivem.net/vehicles/burrito.webp",
  },
  {
    id: 110,
    name: "Camper",
    category: "Vans",
    price: 25000,
    brand: "Brute",
    seats: 4,
    topSpeed: 140,
    acceleration: 4.8,
    handling: 5.2,
    image: "https://docs.fivem.net/vehicles/camper.webp",
  },
  {
    id: 111,
    name: "Gang Burrito",
    category: "Vans",
    price: 45000,
    brand: "Declasse",
    seats: 4,
    topSpeed: 160,
    acceleration: 5.5,
    handling: 5.8,
    image: "https://docs.fivem.net/vehicles/gburrito.webp",
  },
  {
    id: 112,
    name: "Journey",
    category: "Vans",
    price: 15000,
    brand: "Zirconium",
    seats: 4,
    topSpeed: 130,
    acceleration: 4.5,
    handling: 4.8,
    image: "https://docs.fivem.net/vehicles/journey.webp",
  },
  {
    id: 113,
    name: "Minivan",
    category: "Vans",
    price: 30000,
    brand: "Vapid",
    seats: 4,
    topSpeed: 150,
    acceleration: 5.2,
    handling: 5.5,
    image: "https://docs.fivem.net/vehicles/minivan.webp",
  },
  {
    id: 114,
    name: "Paradise",
    category: "Vans",
    price: 12000,
    brand: "Bravado",
    seats: 4,
    topSpeed: 145,
    acceleration: 5.0,
    handling: 5.3,
    image: "https://docs.fivem.net/vehicles/paradise.webp",
  },
  {
    id: 115,
    name: "Pony",
    category: "Vans",
    price: 9000,
    brand: "Brute",
    seats: 4,
    topSpeed: 140,
    acceleration: 4.8,
    handling: 5.1,
    image: "https://docs.fivem.net/vehicles/pony.webp",
  },
  {
    id: 116,
    name: "Rumpo",
    category: "Vans",
    price: 19000,
    brand: "Bravado",
    seats: 4,
    topSpeed: 155,
    acceleration: 5.3,
    handling: 5.6,
    image: "https://docs.fivem.net/vehicles/rumpo.webp",
  },
  {
    id: 117,
    name: "Speedo",
    category: "Vans",
    price: 33000,
    brand: "Vapid",
    seats: 2,
    topSpeed: 150,
    acceleration: 5.0,
    handling: 5.8,
    image: "https://docs.fivem.net/vehicles/speedo.webp",
  },
  {
    id: 118,
    name: "Surge",
    category: "Vans",
    price: 38000,
    brand: "Cheval",
    seats: 4,
    topSpeed: 155,
    acceleration: 5.2,
    handling: 6.0,
    image: "https://docs.fivem.net/vehicles/surge.webp",
  },
  {
    id: 119,
    name: "Youga",
    category: "Vans",
    price: 25000,
    brand: "Bravado",
    seats: 2,
    topSpeed: 145,
    acceleration: 4.8,
    handling: 5.7,
    image: "https://docs.fivem.net/vehicles/youga.webp",
  },
  {
    id: 120,
    name: "Youga Classic",
    category: "Vans",
    price: 20000,
    brand: "Vapid",
    seats: 2,
    topSpeed: 140,
    acceleration: 4.6,
    handling: 5.5,
    image: "https://docs.fivem.net/vehicles/youga2.webp",
  },

  // Boats
  {
    id: 121,
    name: "Avisa",
    category: "Boats",
    price: 500000,
    brand: "Kraken",
    seats: 4,
    topSpeed: 80,
    acceleration: 6.0,
    handling: 7.0,
    image: "https://docs.fivem.net/vehicles/avisa.webp",
  },
  {
    id: 122,
    name: "Dinghy",
    category: "Boats",
    price: 15000,
    brand: "Nagasaki",
    seats: 4,
    topSpeed: 60,
    acceleration: 5.0,
    handling: 6.5,
    image: "https://docs.fivem.net/vehicles/dinghy.webp",
  },
  {
    id: 123,
    name: "Jetmax",
    category: "Boats",
    price: 220000,
    brand: "Shitzu",
    seats: 4,
    topSpeed: 120,
    acceleration: 8.0,
    handling: 7.5,
    image: "https://docs.fivem.net/vehicles/jetmax.webp",
  },
  {
    id: 124,
    name: "Marquis",
    category: "Boats",
    price: 200000,
    brand: "Dinka",
    seats: 4,
    topSpeed: 70,
    acceleration: 5.5,
    handling: 6.8,
    image: "https://docs.fivem.net/vehicles/marquis.webp",
  },
  {
    id: 125,
    name: "Seashark",
    category: "Boats",
    price: 15000,
    brand: "Speedophile",
    seats: 2,
    topSpeed: 90,
    acceleration: 7.0,
    handling: 7.2,
    image: "https://docs.fivem.net/vehicles/seashark.webp",
  },
  {
    id: 126,
    name: "Squalo",
    category: "Boats",
    price: 180000,
    brand: "Shitzu",
    seats: 4,
    topSpeed: 100,
    acceleration: 7.5,
    handling: 7.0,
    image: "https://docs.fivem.net/vehicles/squalo.webp",
  },
  {
    id: 127,
    name: "Submersible",
    category: "Boats",
    price: 300000,
    brand: "Nagasaki",
    seats: 2,
    topSpeed: 50,
    acceleration: 4.0,
    handling: 6.0,
    image: "https://docs.fivem.net/vehicles/submersible.webp",
  },
  {
    id: 128,
    name: "Suntrap",
    category: "Boats",
    price: 120000,
    brand: "Shitzu",
    seats: 4,
    topSpeed: 85,
    acceleration: 6.5,
    handling: 6.8,
    image: "https://docs.fivem.net/vehicles/suntrap.webp",
  },
  {
    id: 129,
    name: "Toro",
    category: "Boats",
    price: 250000,
    brand: "Lampadati",
    seats: 4,
    topSpeed: 110,
    acceleration: 8.5,
    handling: 7.8,
    image: "https://docs.fivem.net/vehicles/toro.webp",
  },
  {
    id: 130,
    name: "Tropic",
    category: "Boats",
    price: 135000,
    brand: "Shitzu",
    seats: 4,
    topSpeed: 95,
    acceleration: 7.2,
    handling: 7.0,
    image: "https://docs.fivem.net/vehicles/tropic.webp",
  },

  // Helicopters
  {
    id: 131,
    name: "Frogger",
    category: "Helicopters",
    price: 300000,
    brand: "Buckingham",
    seats: 4,
    topSpeed: 190,
    acceleration: 7.8,
    handling: 7.2,
    image: "https://docs.fivem.net/vehicles/frogger.webp",
  },
  {
    id: 132,
    name: "Maverick",
    category: "Helicopters",
    price: 200000,
    brand: "Buckingham",
    seats: 4,
    topSpeed: 170,
    acceleration: 7.0,
    handling: 6.8,
    image: "https://docs.fivem.net/vehicles/maverick.webp",
  },
  {
    id: 133,
    name: "Supervolito",
    category: "Helicopters",
    price: 450000,
    brand: "Buckingham",
    seats: 4,
    topSpeed: 195,
    acceleration: 8.0,
    handling: 7.5,
    image: "https://docs.fivem.net/vehicles/supervolito.webp",
  },

  // Planes
  {
    id: 141,
    name: "Alpha Z1",
    category: "Planes",
    price: 800000,
    brand: "Buckingham",
    seats: 2,
    topSpeed: 350,
    acceleration: 8.5,
    handling: 8.0,
    image: "https://docs.fivem.net/vehicles/alphaz1.webp",
  },
  {
    id: 143,
    name: "Blimp",
    category: "Planes",
    price: 100000,
    brand: "Buckingham",
    seats: 4,
    topSpeed: 80,
    acceleration: 3.0,
    handling: 4.0,
    image: "https://docs.fivem.net/vehicles/blimp.webp",
  },
  {
    id: 144,
    name: "Cuban 800",
    category: "Planes",
    price: 240000,
    brand: "Buckingham",
    seats: 4,
    topSpeed: 280,
    acceleration: 7.0,
    handling: 7.5,
    image: "https://docs.fivem.net/vehicles/cuban800.webp",
  },
  {
    id: 145,
    name: "Dodo",
    category: "Planes",
    price: 500000,
    brand: "Mammoth",
    seats: 2,
    topSpeed: 200,
    acceleration: 6.5,
    handling: 7.0,
    image: "https://docs.fivem.net/vehicles/dodo.webp",
  },
  {
    id: 146,
    name: "Duster",
    category: "Planes",
    price: 175000,
    brand: "Buckingham",
    seats: 2,
    topSpeed: 250,
    acceleration: 6.8,
    handling: 7.2,
    image: "https://docs.fivem.net/vehicles/duster.webp",
  },

  {
    id: 150,
    name: "Luxor",
    category: "Planes",
    price: 1500000,
    brand: "Buckingham",
    seats: 4,
    topSpeed: 320,
    acceleration: 8.0,
    handling: 7.8,
    image: "https://docs.fivem.net/vehicles/luxor.webp",
  },
  {
    id: 152,
    name: "Mammatus",
    category: "Planes",
    price: 300000,
    brand: "Buckingham",
    seats: 4,
    topSpeed: 270,
    acceleration: 7.5,
    handling: 7.8,
    image: "https://docs.fivem.net/vehicles/mammatus.webp",
  },

  {
    id: 154,
    name: "Nimbus",
    category: "Planes",
    price: 1800000,
    brand: "Buckingham",
    seats: 4,
    topSpeed: 330,
    acceleration: 8.2,
    handling: 8.0,
    image: "https://docs.fivem.net/vehicles/nimbus.webp",
  },

  {
    id: 156,
    name: "Shamal",
    category: "Planes",
    price: 1200000,
    brand: "Buckingham",
    seats: 4,
    topSpeed: 340,
    acceleration: 8.3,
    handling: 8.1,
    image: "https://docs.fivem.net/vehicles/shamal.webp",
  },

  {
    id: 158,
    name: "Velum",
    category: "Planes",
    price: 450000,
    brand: "Buckingham",
    seats: 4,
    topSpeed: 290,
    acceleration: 7.5,
    handling: 7.8,
    image: "https://docs.fivem.net/vehicles/velum.webp",
  },
  {
    id: 159,
    name: "Vestra",
    category: "Planes",
    price: 950000,
    brand: "Buckingham",
    seats: 2,
    topSpeed: 310,
    acceleration: 8.0,
    handling: 8.2,
    image: "https://docs.fivem.net/vehicles/vestra.webp",
  },

  // Additional Supercars
  {
    id: 196,
    name: "811",
    category: "Super",
    price: 1130000,
    brand: "Pfister",
    seats: 2,
    topSpeed: 360,
    acceleration: 9.6,
    handling: 8.8,
    image: "https://docs.fivem.net/vehicles/pfister811.webp",
  },
  {
    id: 197,
    name: "Bullet",
    category: "Super",
    price: 155000,
    brand: "Vapid",
    seats: 2,
    topSpeed: 340,
    acceleration: 9.0,
    handling: 8.2,
    image: "https://docs.fivem.net/vehicles/bullet.webp",
  },
  {
    id: 198,
    name: "Cheetah",
    category: "Super",
    price: 650000,
    brand: "Grotti",
    seats: 2,
    topSpeed: 345,
    acceleration: 9.2,
    handling: 8.5,
    image: "https://docs.fivem.net/vehicles/cheetah.webp",
  },
  {
    id: 199,
    name: "Coil Brawler",
    category: "Off-road",
    price: 715000,
    brand: "Coil",
    seats: 4,
    topSpeed: 280,
    acceleration: 8.0,
    handling: 7.5,
    image: "https://docs.fivem.net/vehicles/brawler.webp",
  },
  {
    id: 200,
    name: "Coquette",
    category: "Sports",
    price: 138000,
    brand: "Inverto",
    seats: 2,
    topSpeed: 285,
    acceleration: 8.4,
    handling: 8.1,
    image: "https://docs.fivem.net/vehicles/coquette.webp",
  },
  {
    id: 201,
    name: "Coquette Classic",
    category: "Sports Classics",
    price: 665000,
    brand: "Inverto",
    seats: 2,
    topSpeed: 275,
    acceleration: 8.2,
    handling: 8.0,
    image: "https://docs.fivem.net/vehicles/coquette2.webp",
  },
  {
    id: 202,
    name: "Coquette BlackFin",
    category: "Sports Classics",
    price: 695000,
    brand: "Inverto",
    seats: 2,
    topSpeed: 270,
    acceleration: 8.0,
    handling: 7.8,
    image: "https://docs.fivem.net/vehicles/coquette3.webp",
  },
  {
    id: 203,
    name: "Cyclone",
    category: "Super",
    price: 1890000,
    brand: "Coil",
    seats: 2,
    topSpeed: 330,
    acceleration: 9.8,
    handling: 9.0,
    image: "https://docs.fivem.net/vehicles/cyclone.webp",
  },
  {
    id: 204,
    name: "Deveste Eight",
    category: "Super",
    price: 2200000,
    brand: "Principe",
    seats: 2,
    topSpeed: 365,
    acceleration: 9.7,
    handling: 9.1,
    image: "https://docs.fivem.net/vehicles/deveste.webp",
  },
  {
    id: 205,
    name: "Elegy Retro Custom",
    category: "Sports",
    price: 904000,
    brand: "Annis",
    seats: 4,
    topSpeed: 290,
    acceleration: 8.6,
    handling: 8.4,
    image: "https://docs.fivem.net/vehicles/elegy.webp",
  },
  {
    id: 206,
    name: "Entity XXR",
    category: "Super",
    price: 2300000,
    brand: "Overflod",
    seats: 2,
    topSpeed: 355,
    acceleration: 9.6,
    handling: 9.0,
    image: "https://docs.fivem.net/vehicles/entity2.webp",
  },
  {
    id: 207,
    name: "Emerus",
    category: "Super",
    price: 2750000,
    brand: "Progen",
    seats: 2,
    topSpeed: 360,
    acceleration: 9.8,
    handling: 9.2,
    image: "https://docs.fivem.net/vehicles/emerus.webp",
  },
  {
    id: 208,
    name: "Feltzer",
    category: "Sports",
    price: 130000,
    brand: "Benefactor",
    seats: 2,
    topSpeed: 285,
    acceleration: 8.6,
    handling: 8.1,
    image: "https://docs.fivem.net/vehicles/feltzer3.webp",
  },
  {
    id: 209,
    name: "Flash GT",
    category: "Sports",
    price: 375000,
    brand: "Vapid",
    seats: 2,
    topSpeed: 295,
    acceleration: 8.8,
    handling: 8.5,
    image: "https://docs.fivem.net/vehicles/flashgt.webp",
  },
  {
    id: 210,
    name: "Furore GT",
    category: "Sports",
    price: 448000,
    brand: "Lampadati",
    seats: 2,
    topSpeed: 290,
    acceleration: 8.5,
    handling: 8.2,
    image: "https://docs.fivem.net/vehicles/furoregt.webp",
  },
  {
    id: 211,
    name: "GP1",
    category: "Super",
    price: 1260000,
    brand: "Progen",
    seats: 2,
    topSpeed: 350,
    acceleration: 9.4,
    handling: 8.9,
    image: "https://docs.fivem.net/vehicles/gp1.webp",
  },
  {
    id: 212,
    name: "Infernus",
    category: "Super",
    price: 440000,
    brand: "Pegassi",
    seats: 2,
    topSpeed: 345,
    acceleration: 9.1,
    handling: 8.4,
    image: "https://docs.fivem.net/vehicles/infernus.webp",
  },
  {
    id: 213,
    name: "Itali GTO",
    category: "Sports",
    price: 1950000,
    brand: "Grotti",
    seats: 2,
    topSpeed: 300,
    acceleration: 9.0,
    handling: 8.8,
    image: "https://docs.fivem.net/vehicles/italigto.webp",
  },
  {
    id: 214,
    name: "Jester",
    category: "Sports",
    price: 240000,
    brand: "Dinka",
    seats: 2,
    topSpeed: 285,
    acceleration: 8.4,
    handling: 8.2,
    image: "https://docs.fivem.net/vehicles/jester.webp",
  },
  {
    id: 215,
    name: "Jester Classic",
    category: "Sports Classics",
    price: 990000,
    brand: "Dinka",
    seats: 2,
    topSpeed: 275,
    acceleration: 8.2,
    handling: 8.0,
    image: "https://docs.fivem.net/vehicles/jester3.webp",
  },
  {
    id: 216,
    name: "Krieger",
    category: "Super",
    price: 2850000,
    brand: "Benefactor",
    seats: 2,
    topSpeed: 365,
    acceleration: 9.8,
    handling: 9.3,
    image: "https://docs.fivem.net/vehicles/krieger.webp",
  },
  {
    id: 217,
    name: "Lynx",
    category: "Sports",
    price: 173000,
    brand: "Ocelot",
    seats: 2,
    topSpeed: 280,
    acceleration: 8.3,
    handling: 8.1,
    image: "https://docs.fivem.net/vehicles/lynx.webp",
  },
  {
    id: 218,
    name: "Massacro",
    category: "Sports",
    price: 275000,
    brand: "Dewbauchee",
    seats: 2,
    topSpeed: 290,
    acceleration: 8.6,
    handling: 8.3,
    image: "https://docs.fivem.net/vehicles/massacro.webp",
  },
  {
    id: 219,
    name: "Massacro Racecar",
    category: "Sports",
    price: 385000,
    brand: "Dewbauchee",
    seats: 2,
    topSpeed: 295,
    acceleration: 8.8,
    handling: 8.5,
    image: "https://docs.fivem.net/vehicles/massacro2.webp",
  },
  {
    id: 220,
    name: "Neon",
    category: "Sports",
    price: 1500000,
    brand: "Pfister",
    seats: 2,
    topSpeed: 295,
    acceleration: 8.9,
    handling: 8.7,
    image: "https://docs.fivem.net/vehicles/neon.webp",
  },
  {
    id: 221,
    name: "Omnis",
    category: "Sports",
    price: 701000,
    brand: "Obey",
    seats: 2,
    topSpeed: 285,
    acceleration: 8.5,
    handling: 8.3,
    image: "https://docs.fivem.net/vehicles/omnis.webp",
  },
  {
    id: 222,
    name: "Pariah",
    category: "Sports",
    price: 1420000,
    brand: "Ocelot",
    seats: 2,
    topSpeed: 310,
    acceleration: 9.2,
    handling: 9.0,
    image: "https://docs.fivem.net/vehicles/pariah.webp",
  },
  {
    id: 223,
    name: "Penetrator",
    category: "Super",
    price: 1950000,
    brand: "Ocelot",
    seats: 2,
    topSpeed: 350,
    acceleration: 9.5,
    handling: 8.9,
    image: "https://docs.fivem.net/vehicles/penetrator.webp",
  },
  {
    id: 224,
    name: "Rapid GT",
    category: "Sports",
    price: 132000,
    brand: "Dewbauchee",
    seats: 2,
    topSpeed: 285,
    acceleration: 8.5,
    handling: 8.2,
    image: "https://docs.fivem.net/vehicles/rapidgt.webp",
  },
  {
    id: 225,
    name: "Rapid GT Convertible",
    category: "Sports",
    price: 140000,
    brand: "Dewbauchee",
    seats: 2,
    topSpeed: 285,
    acceleration: 8.5,
    handling: 8.2,
    image: "https://docs.fivem.net/vehicles/rapidgt2.webp",
  },
  {
    id: 226,
    name: "Reaper",
    category: "Super",
    price: 1595000,
    brand: "Pegassi",
    seats: 2,
    topSpeed: 345,
    acceleration: 9.3,
    handling: 8.6,
    image: "https://docs.fivem.net/vehicles/reaper.webp",
  },
  {
    id: 227,
    name: "Revolter",
    category: "Sports",
    price: 1610000,
    brand: "Übermacht",
    seats: 4,
    topSpeed: 295,
    acceleration: 8.8,
    handling: 8.5,
    image: "https://docs.fivem.net/vehicles/revolter.webp",
  },
  {
    id: 228,
    name: "Ruston",
    category: "Sports",
    price: 320000,
    brand: "Hijak",
    seats: 2,
    topSpeed: 280,
    acceleration: 8.3,
    handling: 8.1,
    image: "https://docs.fivem.net/vehicles/ruston.webp",
  },
  {
    id: 229,
    name: "Schafter V12",
    category: "Sports",
    price: 80000,
    brand: "Benefactor",
    seats: 4,
    topSpeed: 285,
    acceleration: 8.4,
    handling: 8.2,
    image: "https://docs.fivem.net/vehicles/schafter3.webp",
  },
  {
    id: 230,
    name: "Schlagen GT",
    category: "Sports",
    price: 1300000,
    brand: "Benefactor",
    seats: 2,
    topSpeed: 300,
    acceleration: 8.9,
    handling: 8.7,
    image: "https://docs.fivem.net/vehicles/schlagen.webp",
  },
  {
    id: 231,
    name: "Schwarzer",
    category: "Sports",
    price: 66000,
    brand: "Benefactor",
    seats: 4,
    topSpeed: 275,
    acceleration: 8.2,
    handling: 8.0,
    image: "https://docs.fivem.net/vehicles/schwarzer.webp",
  },
  {
    id: 232,
    name: "Seven-70",
    category: "Sports",
    price: 695000,
    brand: "Dewbauchee",
    seats: 2,
    topSpeed: 290,
    acceleration: 8.6,
    handling: 8.4,
    image: "https://docs.fivem.net/vehicles/seven70.webp",
  },
  {
    id: 233,
    name: "Specter",
    category: "Sports",
    price: 320000,
    brand: "Dewbauchee",
    seats: 2,
    topSpeed: 285,
    acceleration: 8.4,
    handling: 8.2,
    image: "https://docs.fivem.net/vehicles/specter.webp",
  },
  {
    id: 234,
    name: "Specter Custom",
    category: "Sports",
    price: 355000,
    brand: "Dewbauchee",
    seats: 2,
    topSpeed: 290,
    acceleration: 8.6,
    handling: 8.4,
    image: "https://docs.fivem.net/vehicles/specter2.webp",
  },
  {
    id: 235,
    name: "Sultan",
    category: "Sports",
    price: 12000,
    brand: "Karin",
    seats: 4,
    topSpeed: 260,
    acceleration: 7.8,
    handling: 7.5,
    image: "https://docs.fivem.net/vehicles/sultan.webp",
  },
  {
    id: 236,
    name: "Sultan RS",
    category: "Sports",
    price: 150000,
    brand: "Karin",
    seats: 4,
    topSpeed: 280,
    acceleration: 8.5,
    handling: 8.0,
    image: "https://docs.fivem.net/vehicles/sultanrs.webp",
  },
  {
    id: 237,
    name: "Surano",
    category: "Sports",
    price: 80000,
    brand: "Benefactor",
    seats: 2,
    topSpeed: 275,
    acceleration: 8.1,
    handling: 7.9,
    image: "https://docs.fivem.net/vehicles/surano.webp",
  },
  {
    id: 238,
    name: "T20",
    category: "Super",
    price: 2200000,
    brand: "Progen",
    seats: 2,
    topSpeed: 355,
    acceleration: 9.7,
    handling: 9.0,
    image: "https://docs.fivem.net/vehicles/t20.webp",
  },
  {
    id: 239,
    name: "Tropos Rallye",
    category: "Sports",
    price: 816000,
    brand: "Lampadati",
    seats: 2,
    topSpeed: 285,
    acceleration: 8.4,
    handling: 8.2,
    image: "https://docs.fivem.net/vehicles/tropos.webp",
  },
  {
    id: 240,
    name: "Vacca",
    category: "Super",
    price: 240000,
    brand: "Pegassi",
    seats: 2,
    topSpeed: 340,
    acceleration: 9.0,
    handling: 8.3,
    image: "https://docs.fivem.net/vehicles/vacca.webp",
  },
  {
    id: 241,
    name: "Verlierer",
    category: "Sports",
    price: 990000,
    brand: "Benefactor",
    seats: 2,
    topSpeed: 290,
    acceleration: 8.6,
    handling: 8.4,
    image: "https://docs.fivem.net/vehicles/verlierer2.webp",
  },
  {
    id: 242,
    name: "Voltic",
    category: "Super",
    price: 150000,
    brand: "Coil",
    seats: 2,
    topSpeed: 335,
    acceleration: 9.2,
    handling: 8.6,
    image: "https://docs.fivem.net/vehicles/voltic.webp",
  },
  {
    id: 243,
    name: "Voltic 2",
    category: "Super",
    price: 3800000,
    brand: "Coil",
    seats: 2,
    topSpeed: 340,
    acceleration: 9.4,
    handling: 8.8,
    image: "https://docs.fivem.net/vehicles/voltic2.webp",
  },
  {
    id: 244,
    name: "X80 Proto",
    category: "Super",
    price: 2700000,
    brand: "Grotti",
    seats: 2,
    topSpeed: 360,
    acceleration: 9.8,
    handling: 9.2,
    image: "https://docs.fivem.net/vehicles/x80proto.webp",
  },
  {
    id: 245,
    name: "Zentorno",
    category: "Super",
    price: 725000,
    brand: "Pegassi",
    seats: 2,
    topSpeed: 345,
    acceleration: 9.3,
    handling: 8.8,
    image: "https://docs.fivem.net/vehicles/zentorno.webp",
  },

  // Additional Muscle Cars
  {
    id: 247,
    name: "Buccaneer",
    category: "Muscle",
    price: 29000,
    brand: "Albany",
    seats: 4,
    topSpeed: 230,
    acceleration: 6.8,
    handling: 6.4,
    image: "https://docs.fivem.net/vehicles/buccaneer.webp",
  },
  {
    id: 248,
    name: "Buccaneer Custom",
    category: "Muscle",
    price: 29000,
    brand: "Albany",
    seats: 4,
    topSpeed: 235,
    acceleration: 7.0,
    handling: 6.6,
    image: "https://docs.fivem.net/vehicles/buccaneer2.webp",
  },
  {
    id: 249,
    name: "Chino",
    category: "Muscle",
    price: 225000,
    brand: "Vapid",
    seats: 4,
    topSpeed: 240,
    acceleration: 7.2,
    handling: 6.8,
    image: "https://docs.fivem.net/vehicles/chino.webp",
  },
  {
    id: 250,
    name: "Chino Custom",
    category: "Muscle",
    price: 225000,
    brand: "Vapid",
    seats: 4,
    topSpeed: 245,
    acceleration: 7.4,
    handling: 7.0,
    image: "https://docs.fivem.net/vehicles/chino2.webp",
  },
  {
    id: 251,
    name: "Coquette BlackFin",
    category: "Muscle",
    price: 695000,
    brand: "Inverto",
    seats: 2,
    topSpeed: 270,
    acceleration: 8.0,
    handling: 7.8,
    image: "https://docs.fivem.net/vehicles/coquette3.webp",
  },
  {
    id: 253,
    name: "Dukes",
    category: "Muscle",
    price: 28000,
    brand: "Imponte",
    seats: 4,
    topSpeed: 240,
    acceleration: 7.2,
    handling: 6.6,
    image: "https://docs.fivem.net/vehicles/dukes.webp",
  },
  {
    id: 255,
    name: "Dukes 3",
    category: "Muscle",
    price: 28000,
    brand: "Imponte",
    seats: 4,
    topSpeed: 240,
    acceleration: 7.2,
    handling: 6.6,
    image: "https://docs.fivem.net/vehicles/dukes3.webp",
  },
  {
    id: 256,
    name: "Faction",
    category: "Muscle",
    price: 36000,
    brand: "Willard",
    seats: 4,
    topSpeed: 235,
    acceleration: 7.0,
    handling: 6.5,
    image: "https://docs.fivem.net/vehicles/faction.webp",
  },
  {
    id: 257,
    name: "Faction Custom",
    category: "Muscle",
    price: 36000,
    brand: "Willard",
    seats: 4,
    topSpeed: 240,
    acceleration: 7.2,
    handling: 6.7,
    image: "https://docs.fivem.net/vehicles/faction2.webp",
  },
  {
    id: 258,
    name: "Faction Custom Donk",
    category: "Muscle",
    price: 36000,
    brand: "Willard",
    seats: 4,
    topSpeed: 230,
    acceleration: 6.8,
    handling: 6.3,
    image: "https://docs.fivem.net/vehicles/faction3.webp",
  },
  {
    id: 260,
    name: "Hermes",
    category: "Muscle",
    price: 535000,
    brand: "Albany",
    seats: 4,
    topSpeed: 245,
    acceleration: 7.4,
    handling: 7.0,
    image: "https://docs.fivem.net/vehicles/hermes.webp",
  },
  {
    id: 261,
    name: "Hotknife",
    category: "Muscle",
    price: 125000,
    brand: "Vapid",
    seats: 2,
    topSpeed: 235,
    acceleration: 7.0,
    handling: 6.8,
    image: "https://docs.fivem.net/vehicles/hotknife.webp",
  },
  {
    id: 262,
    name: "Hustler",
    category: "Muscle",
    price: 625000,
    brand: "Vapid",
    seats: 2,
    topSpeed: 240,
    acceleration: 7.2,
    handling: 6.9,
    image: "https://docs.fivem.net/vehicles/hustler.webp",
  },
  {
    id: 263,
    name: "Impaler",
    category: "Muscle",
    price: 30000,
    brand: "Declasse",
    seats: 4,
    topSpeed: 245,
    acceleration: 7.3,
    handling: 6.8,
    image: "https://docs.fivem.net/vehicles/impaler.webp",
  },
  {
    id: 264,
    name: "Imperator",
    category: "Muscle",
    price: 585000,
    brand: "Vapid",
    seats: 4,
    topSpeed: 250,
    acceleration: 7.5,
    handling: 7.0,
    image: "https://docs.fivem.net/vehicles/imperator.webp",
  },
  {
    id: 265,
    name: "Lurcher",
    category: "Muscle",
    price: 23000,
    brand: "Albany",
    seats: 4,
    topSpeed: 230,
    acceleration: 6.8,
    handling: 6.4,
    image: "https://docs.fivem.net/vehicles/lurcher.webp",
  },
  {
    id: 267,
    name: "Moonbeam Custom",
    category: "Muscle",
    price: 18000,
    brand: "Declasse",
    seats: 4,
    topSpeed: 225,
    acceleration: 6.7,
    handling: 6.2,
    image: "https://docs.fivem.net/vehicles/moonbeam2.webp",
  },
  {
    id: 268,
    name: "Nightshade",
    category: "Muscle",
    price: 585000,
    brand: "Imponte",
    seats: 4,
    topSpeed: 245,
    acceleration: 7.3,
    handling: 6.9,
    image: "https://docs.fivem.net/vehicles/nightshade.webp",
  },
  {
    id: 271,
    name: "Rat-Loader",
    category: "Muscle",
    price: 6000,
    brand: "Bravado",
    seats: 2,
    topSpeed: 200,
    acceleration: 5.8,
    handling: 5.5,
    image: "https://docs.fivem.net/vehicles/ratloader.webp",
  },
  {
    id: 272,
    name: "Rat-Truck",
    category: "Muscle",
    price: 6000,
    brand: "Bravado",
    seats: 2,
    topSpeed: 205,
    acceleration: 6.0,
    handling: 5.7,
    image: "https://docs.fivem.net/vehicles/ratloader2.webp",
  },
  {
    id: 273,
    name: "Ruiner",
    category: "Muscle",
    price: 15000,
    brand: "Imponte",
    seats: 2,
    topSpeed: 235,
    acceleration: 7.0,
    handling: 6.6,
    image: "https://docs.fivem.net/vehicles/ruiner.webp",
  },
  {
    id: 274,
    name: "Sabre Turbo",
    category: "Muscle",
    price: 15000,
    brand: "Declasse",
    seats: 4,
    topSpeed: 245,
    acceleration: 7.3,
    handling: 6.8,
    image: "https://docs.fivem.net/vehicles/sabregt.webp",
  },
  {
    id: 275,
    name: "Sabre Turbo Custom",
    category: "Muscle",
    price: 15000,
    brand: "Declasse",
    seats: 4,
    topSpeed: 250,
    acceleration: 7.5,
    handling: 7.0,
    image: "https://docs.fivem.net/vehicles/sabregt2.webp",
  },
  {
    id: 276,
    name: "Slamvan",
    category: "Muscle",
    price: 15000,
    brand: "Vapid",
    seats: 2,
    topSpeed: 230,
    acceleration: 6.8,
    handling: 6.4,
    image: "https://docs.fivem.net/vehicles/slamvan.webp",
  },
  {
    id: 277,
    name: "Slamvan Custom",
    category: "Muscle",
    price: 15000,
    brand: "Vapid",
    seats: 2,
    topSpeed: 235,
    acceleration: 7.0,
    handling: 6.6,
    image: "https://docs.fivem.net/vehicles/slamvan2.webp",
  },
  {
    id: 278,
    name: "Slamvan 3",
    category: "Muscle",
    price: 15000,
    brand: "Vapid",
    seats: 2,
    topSpeed: 225,
    acceleration: 6.6,
    handling: 6.2,
    image: "https://docs.fivem.net/vehicles/slamvan3.webp",
  },
  {
    id: 279,
    name: "Tampa",
    category: "Muscle",
    price: 375000,
    brand: "Declasse",
    seats: 2,
    topSpeed: 250,
    acceleration: 7.5,
    handling: 7.0,
    image: "https://docs.fivem.net/vehicles/tampa.webp",
  },
  {
    id: 280,
    name: "Tulip",
    category: "Muscle",
    price: 585000,
    brand: "Declasse",
    seats: 4,
    topSpeed: 245,
    acceleration: 7.3,
    handling: 6.9,
    image: "https://docs.fivem.net/vehicles/tulip.webp",
  },
  {
    id: 281,
    name: "Vamos",
    category: "Muscle",
    price: 585000,
    brand: "Declasse",
    seats: 4,
    topSpeed: 240,
    acceleration: 7.2,
    handling: 6.8,
    image: "https://docs.fivem.net/vehicles/vamos.webp",
  },
  {
    id: 282,
    name: "Vigero",
    category: "Muscle",
    price: 21000,
    brand: "Declasse",
    seats: 2,
    topSpeed: 240,
    acceleration: 7.2,
    handling: 6.7,
    image: "https://docs.fivem.net/vehicles/vigero.webp",
  },
  {
    id: 283,
    name: "Virgo",
    category: "Muscle",
    price: 19500,
    brand: "Albany",
    seats: 4,
    topSpeed: 225,
    acceleration: 6.7,
    handling: 6.3,
    image: "https://docs.fivem.net/vehicles/virgo.webp",
  },
  {
    id: 284,
    name: "Virgo Classic",
    category: "Muscle",
    price: 19500,
    brand: "Albany",
    seats: 4,
    topSpeed: 230,
    acceleration: 6.9,
    handling: 6.5,
    image: "https://docs.fivem.net/vehicles/virgo2.webp",
  },
  {
    id: 285,
    name: "Virgo Classic Custom",
    category: "Muscle",
    price: 19500,
    brand: "Albany",
    seats: 4,
    topSpeed: 235,
    acceleration: 7.1,
    handling: 6.7,
    image: "https://docs.fivem.net/vehicles/virgo3.webp",
  },
  {
    id: 286,
    name: "Voodoo",
    category: "Muscle",
    price: 7200,
    brand: "Declasse",
    seats: 4,
    topSpeed: 220,
    acceleration: 6.5,
    handling: 6.1,
    image: "https://docs.fivem.net/vehicles/voodoo.webp",
  },
  {
    id: 287,
    name: "Voodoo Custom",
    category: "Muscle",
    price: 7200,
    brand: "Declasse",
    seats: 4,
    topSpeed: 225,
    acceleration: 6.7,
    handling: 6.3,
    image: "https://docs.fivem.net/vehicles/voodoo2.webp",
  },
  {
    id: 288,
    name: "Yosemite",
    category: "Muscle",
    price: 485000,
    brand: "Declasse",
    seats: 4,
    topSpeed: 240,
    acceleration: 7.2,
    handling: 6.8,
    image: "https://docs.fivem.net/vehicles/yosemite.webp",
  },
];

const categories = [
  { id: "all", name: "Tous", icon: Car },
  { id: "Super", name: "Super", icon: Star },
  { id: "Sports", name: "Sports", icon: Car },
  { id: "Muscle", name: "Muscle", icon: Car },
  { id: "Sedans", name: "Berlines", icon: Car },
  { id: "SUVs", name: "SUVs", icon: Car },
  { id: "Motorcycles", name: "Motos", icon: Bike },
  { id: "Commercial", name: "Commercial", icon: Truck },
  { id: "Compacts", name: "Compacts", icon: Car },
  { id: "Coupes", name: "Coupés", icon: Car },
  { id: "Sports Classics", name: "Sports Classiques", icon: Car },
  { id: "Off-road", name: "Tout-terrain", icon: Car },
  { id: "Vans", name: "Fourgons", icon: Truck },
  { id: "Boats", name: "Bateaux", icon: Car },
  { id: "Helicopters", name: "Hélicoptères", icon: Plane },
  { id: "Planes", name: "Avions", icon: Plane },
];

export default function CataloguePage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("name");
  const [priceRange, setPriceRange] = useState([0, 2500000]);
  const [selectedVehicle, setSelectedVehicle] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const filteredVehicles = useMemo(() => {
    return vehicles
      .filter((vehicle) => {
        const matchesSearch =
          vehicle.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          vehicle.brand.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory =
          selectedCategory === "all" || vehicle.category === selectedCategory;
        const matchesPrice =
          vehicle.price >= priceRange[0] && vehicle.price <= priceRange[1];
        return matchesSearch && matchesCategory && matchesPrice;
      })
      .sort((a, b) => {
        switch (sortBy) {
          case "price-low":
            return a.price - b.price;
          case "price-high":
            return b.price - a.price;
          case "speed":
            return b.topSpeed - a.topSpeed;
          case "acceleration":
            return b.acceleration - a.acceleration;
          case "handling":
            return b.handling - a.handling;
          default:
            return a.name.localeCompare(b.name);
        }
      });
  }, [searchTerm, selectedCategory, sortBy, priceRange]);

  const formatPrice = (price: number) => {
    return `${new Intl.NumberFormat("fr-FR", {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price)} $`;
  };

  const openVehicleModal = (vehicle: any) => {
    setSelectedVehicle(vehicle);
    setIsModalOpen(true);
  };

  const closeVehicleModal = () => {
    console.log("Closing modal...");
    setIsModalOpen(false);
    setSelectedVehicle(null);
  };

  // Fermer le modal avec la touche Échap
  React.useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape" && isModalOpen) {
        closeVehicleModal();
      }
    };

    if (isModalOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isModalOpen]);

  const getPerformanceColor = (value: number, maxValue: number = 10) => {
    const percentage = (value / maxValue) * 100;
    if (percentage >= 80) return "bg-white";
    if (percentage >= 70) return "bg-white";
    if (percentage >= 65) return "bg-white";
    if (percentage >= 60) return "bg-white";
    return "bg-white";
  };

  const getSpeedColor = (speed: number) => {
    return "text-white";
  };

  const getSpeedBarColor = (speed: number) => {
    if (speed >= 350) return "bg-white";
    if (speed >= 300) return "bg-white";
    if (speed >= 280) return "bg-white";
    if (speed >= 260) return "bg-white";
    if (speed >= 250) return "bg-white";
    if (speed >= 240) return "bg-white";
    return "bg-white";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-900 via-neutral-800 via-neutral-700 to-neutral-900 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.02%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%221%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-40"></div>
      <div className="absolute inset-0 bg-gradient-radial from-white/5 via-transparent to-transparent"></div>
      {/* Filters */}
      <div className="max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-8 py-2 mt-6">
        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-4 mb-4 shadow-2xl relative overflow-hidden">
          {/* Decorative Elements */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-white/10 to-white/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-white/10 to-white/10 rounded-full blur-2xl"></div>
          {/* Search and Sort */}
          <div className="flex flex-col lg:flex-row gap-3 mb-3">
            <div className="flex-1 relative group">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/50 w-5 h-5 group-focus-within:text-white transition-colors duration-300" />
              <input
                type="text"
                placeholder="Rechercher un véhicule ou une marque..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-2.5 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-white focus:bg-white/15 transition-all duration-300 text-sm"
              />
            </div>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-7 py-2.5 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:border-white focus:bg-white/15 transition-all duration-300 text-sm min-w-[230px] [&>option]:bg-neutral-800 [&>option]:text-white"
            >
              <option value="name">Nom A-Z</option>
              <option value="price-low">Prix croissant</option>
              <option value="price-high">Prix décroissant</option>
              <option value="speed">Vitesse max</option>
              <option value="acceleration">Accélération</option>
              <option value="handling">Manœuvrabilité</option>
            </select>
          </div>

          {/* Categories */}
          <div className="mb-3">
            <h3 className="text-base font-semibold text-white mb-3 flex items-center gap-2">
              <Filter className="w-5 h-5 text-white" />
              Catégories
            </h3>
            <div className="flex flex-wrap gap-2.5">
              {categories.map((category) => {
                const Icon = category.icon;
                return (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-medium transition-all duration-300 transform hover:scale-105 ${
                      selectedCategory === category.id
                        ? "bg-gradient-to-r from-neutral-600 to-neutral-500 text-white shadow-lg"
                        : "bg-white/10 text-white/80 hover:bg-white/20 hover:text-white border border-white/10 hover:border-white/20"
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{category.name}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Price Range */}
          <div className="space-y-4">
            <div className="flex items-center gap-4 py-2">
              <span className="text-white text-sm min-w-[60px]">Prix :</span>
              <div className="flex-1 relative">
                <input
                  type="range"
                  min="0"
                  max="2500000"
                  step="10000"
                  value={priceRange[1]}
                  onChange={(e) =>
                    setPriceRange([priceRange[0], parseInt(e.target.value)])
                  }
                  className="w-full h-4 bg-white/20 rounded-lg appearance-none cursor-pointer slider"
                />
                <div className="absolute -bottom-6 left-0 right-0 flex justify-between text-xs text-white">
                  <span>0$</span>
                  <span>2.5M$</span>
                </div>
              </div>
              <span className="text-white text-lg font-bold min-w-[120px] text-right">
                {formatPrice(priceRange[1])}
              </span>
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            {selectedCategory !== "all" && (
              <div className="flex items-center gap-2 bg-gradient-to-r from-white/20 to-white/20 border border-white/30 rounded-full px-6 py-3 shadow-lg">
                <span className="text-white text-sm font-semibold">
                  Catégorie :{" "}
                  {categories.find((c) => c.id === selectedCategory)?.name}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Vehicles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredVehicles.map((vehicle) => (
            <div
              key={vehicle.id}
              className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl overflow-hidden hover:bg-white/10 hover:border-white/20 transition-all duration-500 group transform hover:scale-105 hover:shadow-2xl relative"
            >
              {/* Hover Glow Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-white/5 to-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl"></div>
              {/* Vehicle Image */}
              <div className="relative h-40 w-full bg-gradient-to-br from-white/10 to-white/5 flex items-center justify-center overflow-hidden">
                <img
                  src={vehicle.image}
                  alt={vehicle.name}
                  className="w-full h-full p-4 object-contain group-hover:scale-110 transition-transform duration-500"
                  onError={(e) => {
                    e.currentTarget.src =
                      "https://via.placeholder.com/300x150/374151/FFFFFF?text=" +
                      vehicle.name;
                  }}
                />
                <div className="absolute top-4 right-4">
                  <span className="px-3 py-1.5 bg-gradient-to-r from-white/30 to-white/30 backdrop-blur-sm text-white text-xs font-bold rounded-full border border-white/40 shadow-lg">
                    {vehicle.category}
                  </span>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>

              {/* Vehicle Info */}
              <div className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-lg font-bold text-white group-hover:text-white transition-colors duration-300">
                    {vehicle.name}
                  </h3>
                  <span className="text-white font-bold text-lg">
                    {formatPrice(vehicle.price)}
                  </span>
                </div>

                <p className="text-white/60 text-sm mb-4 font-medium">
                  {vehicle.brand}
                </p>

                {/* Performance Bars */}
                <div className="space-y-3 mb-4">
                  <div className="space-y-1">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-white/50">Vitesse</span>
                      <span className="text-white font-medium">
                        {vehicle.topSpeed} km/h
                      </span>
                    </div>
                    <div className="w-full bg-white/10 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full transition-all duration-500 ${getSpeedBarColor(vehicle.topSpeed)}`}
                        style={{
                          width: `${Math.min((vehicle.topSpeed / 400) * 100, 100)}%`,
                        }}
                      ></div>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-white/50">Accélération</span>
                      <span className="text-white font-medium">
                        {vehicle.acceleration}/10
                      </span>
                    </div>
                    <div className="w-full bg-white/10 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full transition-all duration-500 ${getPerformanceColor(vehicle.acceleration)}`}
                        style={{
                          width: `${(vehicle.acceleration / 10) * 100}%`,
                        }}
                      ></div>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-white/50">Manœuvrabilité</span>
                      <span className="text-white font-medium">
                        {vehicle.handling}/10
                      </span>
                    </div>
                    <div className="w-full bg-white/10 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full transition-all duration-500 ${getPerformanceColor(vehicle.handling)}`}
                        style={{ width: `${(vehicle.handling / 10) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                </div>

                {/* Quick Stats */}
                <div className="flex items-center justify-between mb-4 text-xs">
                  <div className="flex items-center gap-1">
                    <Users className="w-3 h-3 text-white/50" />
                    <span className="text-white/70">
                      {vehicle.seats} place{vehicle.seats > 1 ? "s" : ""}
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Zap className="w-3 h-3 text-white/50" />
                    <span className="text-white/70">Performance</span>
                  </div>
                </div>

                {/* Action Button */}
                <button
                  onClick={() => openVehicleModal(vehicle)}
                  className="w-full bg-gradient-to-r from-neutral-600 to-neutral-500 text-white py-3 rounded-xl font-bold hover:from-neutral-500 hover:to-neutral-400 transition-all duration-300 text-sm transform hover:scale-105 shadow-lg relative overflow-hidden group"
                >
                  <span className="relative z-10">Voir détails</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* No Results */}
        {filteredVehicles.length === 0 && (
          <div className="text-center py-20">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-white/20 via-white/20 to-white/20 rounded-full w-32 h-32 mx-auto blur-xl"></div>
              <Car className="w-32 h-32 text-white/20 mx-auto relative z-10" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-3 mt-8">
              Aucun véhicule trouvé
            </h3>
            <p className="text-white/70 text-lg mb-6">
              Essayez de modifier vos critères de recherche
            </p>
            <div className="flex items-center justify-center gap-4">
              <button
                onClick={() => setSearchTerm("")}
                className="px-6 py-3 bg-gradient-to-r from-white to-white text-black rounded-xl font-medium hover:from-white/90 hover:to-white/90 transition-all duration-300 shadow-lg transform hover:scale-105"
              >
                Effacer la recherche
              </button>
              <button
                onClick={() => setSelectedCategory("all")}
                className="px-6 py-3 bg-white/10 text-white rounded-xl font-medium hover:bg-white/20 transition-all duration-300 border border-white/20 shadow-lg transform hover:scale-105"
              >
                Toutes les catégories
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Vehicle Details Modal */}
      {isModalOpen && selectedVehicle && (
        <div
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              closeVehicleModal();
            }
          }}
        >
          <div className="bg-neutral-900/95 border border-white/10 rounded-3xl max-w-5xl w-full max-h-[90vh] overflow-y-auto shadow-2xl relative overflow-hidden">
            {/* Modal Background Pattern */}
            <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2240%22%20height%3D%2240%22%20viewBox%3D%220%200%2040%2040%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.01%22%3E%3Ccircle%20cx%3D%2220%22%20cy%3D%2220%22%20r%3D%221%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-30 pointer-events-none"></div>
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-gradient-to-r from-white/5 to-white/10">
              <div className="min-w-0">
                <div className="flex items-center gap-5 flex-wrap">
                  <span className="px-3 py-1 bg-white/20 text-white text-sm font-bold rounded-full border border-white/30">
                    {selectedVehicle.category}
                  </span>
                  <span className="text-white font-bold text-2xl whitespace-nowrap">
                    {formatPrice(selectedVehicle.price)}
                  </span>
                  <h2 className="text-2xl font-bold text-white whitespace-nowrap">
                    {selectedVehicle.name}
                  </h2>
                  <p className="text-white text-2xl font-bold whitespace-nowrap">
                    {selectedVehicle.brand}
                  </p>
                </div>
              </div>
              <button
                onClick={closeVehicleModal}
                className="text-white/70 hover:text-white transition-all duration-300 p-3 hover:bg-white/10 rounded-full hover:scale-110 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50"
                aria-label="Fermer le modal"
                type="button"
              >
                <X className="w-9 h-9" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                {/* Vehicle Image */}
                <div className="space-y-6">
                  <div className="bg-gradient-to-br from-white/10 to-white/5 rounded-2xl p-6 flex items-center justify-center overflow-hidden group">
                    <img
                      src={selectedVehicle.image}
                      alt={selectedVehicle.name}
                      className="w-full h-96 object-contain group-hover:scale-105 transition-transform duration-500"
                      onError={(e) => {
                        e.currentTarget.src =
                          "https://via.placeholder.com/400x300/374151/FFFFFF?text=" +
                          selectedVehicle.name;
                      }}
                    />
                  </div>

                  {/* Quick Stats Grid */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-white/5 rounded-xl p-4 text-center border border-white/10">
                      <Users className="w-6 h-6 text-white mx-auto mb-2" />
                      <div className="text-2xl font-bold text-white">
                        {selectedVehicle.seats}
                      </div>
                      <div className="text-white/60 text-sm">Places</div>
                    </div>
                    <div className="bg-white/5 rounded-xl p-4 text-center border border-white/10">
                      <Zap className="w-6 h-6 text-[#D3965B] mx-auto mb-2" />
                      <div className="text-2xl font-bold text-white">
                        {selectedVehicle.topSpeed}
                      </div>
                      <div className="text-white/60 text-sm">km/h max</div>
                    </div>
                  </div>
                </div>

                {/* Performance Grid */}
                <div className="space-y-8">
                  <div className="text-center">
                    <h3 className="text-2xl font-bold text-white flex items-center justify-center gap-3 mb-6">
                      <Award className="w-6 h-6 text-white" />
                      Grille de Performances
                    </h3>
                    <div className="w-24 h-1 bg-gradient-to-r from-white via-white to-white mx-auto rounded-full shadow-lg"></div>
                  </div>

                  {/* Speed */}
                  <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-white/80 flex items-center gap-3 text-lg">
                        <Zap className="w-5 h-5 text-white" />
                        Vitesse Maximale
                      </span>
                      <span
                        className={`font-bold text-2xl ${getSpeedColor(selectedVehicle.topSpeed)}`}
                      >
                        {selectedVehicle.topSpeed} km/h
                      </span>
                    </div>
                    <div className="w-full bg-white/10 rounded-full h-3">
                      <div
                        className={`h-3 rounded-full transition-all duration-700 ${getSpeedBarColor(selectedVehicle.topSpeed)}`}
                        style={{
                          width: `${Math.min((selectedVehicle.topSpeed / 400) * 100, 100)}%`,
                        }}
                      ></div>
                    </div>
                  </div>

                  {/* Acceleration */}
                  <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-white/80 flex items-center gap-3 text-lg">
                        <Gauge className="w-5 h-5 text-white" />
                        Accélération
                      </span>
                      <span className="font-bold text-2xl text-white">
                        {selectedVehicle.acceleration}/10
                      </span>
                    </div>
                    <div className="w-full bg-white/10 rounded-full h-3">
                      <div
                        className={`h-3 rounded-full transition-all duration-700 ${getPerformanceColor(selectedVehicle.acceleration)}`}
                        style={{
                          width: `${(selectedVehicle.acceleration / 10) * 100}%`,
                        }}
                      ></div>
                    </div>
                  </div>

                  {/* Handling */}
                  <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-white/80 flex items-center gap-3 text-lg">
                        <Car className="w-5 h-5 text-white" />
                        Manœuvrabilité
                      </span>
                      <span className="font-bold text-2xl text-white">
                        {selectedVehicle.handling}/10
                      </span>
                    </div>
                    <div className="w-full bg-white/10 rounded-full h-3">
                      <div
                        className={`h-3 rounded-full transition-all duration-700 ${getPerformanceColor(selectedVehicle.handling)}`}
                        style={{
                          width: `${(selectedVehicle.handling / 10) * 100}%`,
                        }}
                      ></div>
                    </div>
                  </div>

                </div>
              </div>
            </div>

          </div>
        </div>
      )}

      <style jsx global>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          height: 24px;
          width: 24px;
          border-radius: 50%;
          background: rgb(255, 255, 255);
          cursor: pointer;
          box-shadow: 0 4px 12px rgba(158, 158, 160, 0.4);
          transition: all 0.3s ease;
        }

        .slider::-webkit-slider-thumb:hover {
          transform: scale(1.1);
          box-shadow: 0 6px 16px rgba(156, 163, 175, 0.35);
        }

        .slider::-moz-range-thumb {
          height: 24px;
          width: 24px;
          border-radius: 50%;
          background: #ffffff;
          cursor: pointer;
          border: none;
          box-shadow: 0 4px 12px rgba(158, 158, 160, 0.4);
          transition: all 0.3s ease;
        }

        .slider::-moz-range-thumb:hover {
          transform: scale(1.1);
          box-shadow: 0 6px 16px rgba(156, 163, 175, 0.35);
        }

        .slider {
          transition: all 0.3s ease;
        }

        .slider:hover {
          background: rgba(255, 255, 255, 0.25);
        }

        /* Custom Scrollbar */
        ::-webkit-scrollbar {
          width: 8px;
        }

        ::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 4px;
        }

        ::-webkit-scrollbar-thumb {
          background: linear-gradient(135deg, #ffffff, #ffffff);
          border-radius: 4px;
        }

        ::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(135deg, #ffffff, #f3f4f6);
        }

        /* Smooth Animations */
        * {
          scroll-behavior: smooth;
        }

        /* Enhanced Focus States */
        input:focus,
        select:focus,
        button:focus {
          outline: none;
          ring: 2px;
          ring-color: #ffffff;
          ring-opacity: 0.5;
        }
      `}</style>
    </div>
  );
}
