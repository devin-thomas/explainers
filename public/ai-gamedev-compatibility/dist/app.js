const platforms = [
    {
        "id": "nes",
        "name": "Nintendo Entertainment System / Famicom",
        "short": "NES",
        "generation": 3,
        "kind": "console",
        "year": 1983,
        "region": "Global",
        "cpu": "Ricoh 2A03/2A07 (6502-family)",
        "languages": [
            "C",
            "6502 assembly"
        ],
        "tools": [
            "GBDK-2020",
            "cc65",
            "Mesen",
            "FCEUX"
        ],
        "scores": {
            "documentation": 98,
            "community": 96,
            "toolchain": 82,
            "debugLoop": 94,
            "abstraction": 76,
            "architecture": 58,
            "automation": 86,
            "assets": 84
        },
        "confidence": "high",
        "verdict": "Best-documented 8-bit target; excellent agent feedback loop if mapper scope is kept explicit.",
        "advantage": "Huge public corpus, mature debuggers, reproducible C/assembly toolchains.",
        "friction": "Mapper banking, PPU timing and cycle-sensitive effects still invite confident AI mistakes.",
        "sources": [
            {
                "label": "NESdev Wiki",
                "url": "https://www.nesdev.org/wiki/Nesdev_Wiki"
            },
            {
                "label": "GBDK-2020 supported consoles",
                "url": "https://gbdk.org/docs/api/docs_supported_consoles.html"
            },
            {
                "label": "cc65 supported targets",
                "url": "https://cc65.github.io/doc/cc65.html"
            }
        ],
        "scopeNote": ""
    },
    {
        "id": "fds",
        "name": "Famicom Disk System",
        "short": "FDS",
        "generation": 3,
        "kind": "add-on",
        "year": 1986,
        "region": "Japan",
        "cpu": "NES CPU + disk controller/audio",
        "languages": [
            "C",
            "6502 assembly"
        ],
        "tools": [
            "cc65",
            "Mesen",
            "FDS BIOS"
        ],
        "scores": {
            "documentation": 79,
            "community": 68,
            "toolchain": 72,
            "debugLoop": 82,
            "abstraction": 62,
            "architecture": 51,
            "automation": 70,
            "assets": 62
        },
        "confidence": "medium",
        "verdict": "Shares the NES foundation, but disk BIOS behavior and side changes add fragile state.",
        "advantage": "NES tools and emulator debugging transfer directly.",
        "friction": "Disk I/O, BIOS calls, write behavior and expansion audio are much less represented.",
        "sources": [
            {
                "label": "NESdev FDS reference",
                "url": "https://www.nesdev.org/wiki/Famicom_Disk_System"
            },
            {
                "label": "NESdev Wiki",
                "url": "https://www.nesdev.org/wiki/Nesdev_Wiki"
            }
        ],
        "scopeNote": ""
    },
    {
        "id": "sg1000",
        "name": "Sega SG-1000",
        "short": "SG-1000",
        "generation": 3,
        "kind": "console",
        "year": 1983,
        "region": "Japan / PAL",
        "cpu": "Z80 + TMS9918A-family VDP",
        "languages": [
            "C",
            "Z80 assembly"
        ],
        "tools": [
            "SDCC",
            "devkitSMS",
            "Emulicious"
        ],
        "scores": {
            "documentation": 72,
            "community": 55,
            "toolchain": 68,
            "debugLoop": 76,
            "abstraction": 61,
            "architecture": 70,
            "automation": 70,
            "assets": 65
        },
        "confidence": "medium",
        "verdict": "Simple Z80-era hardware with usable shared Sega tooling, but a small dedicated corpus.",
        "advantage": "Conventional Z80 and tile/sprite concepts are AI-familiar.",
        "friction": "SG-1000-specific examples are sparse and tools often assume Master System features.",
        "sources": [
            {
                "label": "SMS Power development reference",
                "url": "https://www.smspower.org/Development/Index"
            },
            {
                "label": "GBDK-2020 supported consoles",
                "url": "https://gbdk.org/docs/api/docs_supported_consoles.html"
            }
        ],
        "scopeNote": ""
    },
    {
        "id": "sms",
        "name": "Sega Master System / Mark III",
        "short": "Master System",
        "generation": 3,
        "kind": "console",
        "year": 1985,
        "region": "Global",
        "cpu": "Z80 + Sega VDP",
        "languages": [
            "C",
            "Z80 assembly"
        ],
        "tools": [
            "GBDK-2020",
            "devkitSMS",
            "Emulicious"
        ],
        "scores": {
            "documentation": 88,
            "community": 76,
            "toolchain": 84,
            "debugLoop": 90,
            "abstraction": 78,
            "architecture": 76,
            "automation": 84,
            "assets": 78
        },
        "confidence": "high",
        "verdict": "One of the strongest 8-bit choices: modern C, source debugging and straightforward hardware.",
        "advantage": "GBDK cross-platform APIs and Emulicious source debugging shorten agent iteration.",
        "friction": "Banking, sprite-per-line limits and region differences still require tests.",
        "sources": [
            {
                "label": "GBDK-2020 supported consoles",
                "url": "https://gbdk.org/docs/api/docs_supported_consoles.html"
            },
            {
                "label": "SMS Power development reference",
                "url": "https://www.smspower.org/Development/Index"
            }
        ],
        "scopeNote": ""
    },
    {
        "id": "atari7800",
        "name": "Atari 7800",
        "short": "7800",
        "generation": 3,
        "kind": "console",
        "year": 1986,
        "region": "North America / Europe",
        "cpu": "6502C + MARIA display processor",
        "languages": [
            "7800basic",
            "6502 assembly",
            "C"
        ],
        "tools": [
            "7800basic",
            "cc65",
            "A7800/MAME"
        ],
        "scores": {
            "documentation": 74,
            "community": 63,
            "toolchain": 72,
            "debugLoop": 76,
            "abstraction": 74,
            "architecture": 50,
            "automation": 69,
            "assets": 70
        },
        "confidence": "medium",
        "verdict": "High-level 7800basic helps, but MARIA display lists remain a specialist concept.",
        "advantage": "A domain-specific language can let an agent create a playable prototype quickly.",
        "friction": "Moving beyond the abstraction exposes unusual display-list and DMA constraints.",
        "sources": [
            {
                "label": "cc65 supported targets",
                "url": "https://cc65.github.io/doc/cc65.html"
            },
            {
                "label": "7800basic documentation",
                "url": "https://7800.8bitdev.org/index.php/7800basic_Guide"
            }
        ],
        "scopeNote": ""
    },
    {
        "id": "xegs",
        "name": "Atari XEGS",
        "short": "XEGS",
        "generation": 3,
        "kind": "console",
        "year": 1987,
        "region": "North America",
        "cpu": "6502C + ANTIC/GTIA/POKEY",
        "languages": [
            "C",
            "6502 assembly",
            "BASIC"
        ],
        "tools": [
            "cc65",
            "Atari800",
            "Altirra"
        ],
        "scores": {
            "documentation": 78,
            "community": 66,
            "toolchain": 74,
            "debugLoop": 86,
            "abstraction": 68,
            "architecture": 58,
            "automation": 73,
            "assets": 69
        },
        "confidence": "medium",
        "verdict": "Benefits from the mature Atari 8-bit ecosystem, though console-oriented examples are fewer.",
        "advantage": "Altirra is a powerful debugger and the architecture is extensively reverse engineered.",
        "friction": "ANTIC display lists, banked cartridges and Atari-computer assumptions complicate prompts.",
        "sources": [
            {
                "label": "cc65 supported targets",
                "url": "https://cc65.github.io/doc/cc65.html"
            },
            {
                "label": "cc65 Atari guide",
                "url": "https://cc65.github.io/doc/atari.html"
            }
        ],
        "scopeNote": ""
    },
    {
        "id": "scv",
        "name": "Epoch Super Cassette Vision",
        "short": "SCV",
        "generation": 3,
        "kind": "console",
        "year": 1984,
        "region": "Japan / Europe",
        "cpu": "NEC µPD7801G + custom video",
        "languages": [
            "Assembly",
            "Experimental C"
        ],
        "tools": [
            "Community assemblers",
            "MAME"
        ],
        "scores": {
            "documentation": 38,
            "community": 24,
            "toolchain": 29,
            "debugLoop": 48,
            "abstraction": 22,
            "architecture": 43,
            "automation": 30,
            "assets": 28
        },
        "confidence": "low",
        "verdict": "Possible, but an agent would spend more effort reconstructing the environment than building the game.",
        "advantage": "The machine is relatively bounded and emulated.",
        "friction": "No dominant maintained SDK, tiny corpus, scarce English technical documentation.",
        "sources": [
            {
                "label": "Super Cassette Vision overview",
                "url": "https://en.wikipedia.org/wiki/Super_Cassette_Vision"
            }
        ],
        "scopeNote": ""
    },
    {
        "id": "pv1000",
        "name": "Casio PV-1000",
        "short": "PV-1000",
        "generation": 3,
        "kind": "console",
        "year": 1983,
        "region": "Japan",
        "cpu": "Z80A + custom video/audio",
        "languages": [
            "Z80 assembly"
        ],
        "tools": [
            "MAME",
            "Community tools"
        ],
        "scores": {
            "documentation": 31,
            "community": 18,
            "toolchain": 24,
            "debugLoop": 42,
            "abstraction": 15,
            "architecture": 57,
            "automation": 26,
            "assets": 20
        },
        "confidence": "low",
        "verdict": "Straightforward CPU, but almost no modern development ecosystem.",
        "advantage": "Z80 instruction knowledge transfers.",
        "friction": "Platform-specific video/audio knowledge and validated sample code are extremely scarce.",
        "sources": [
            {
                "label": "Casio PV-1000 overview",
                "url": "https://en.wikipedia.org/wiki/PV-1000"
            }
        ],
        "scopeNote": ""
    },
    {
        "id": "c64gs",
        "name": "Commodore 64 Games System",
        "short": "C64GS",
        "generation": 3,
        "kind": "console",
        "year": 1990,
        "region": "Europe",
        "cpu": "6510 + VIC-II + SID",
        "languages": [
            "C",
            "6502 assembly"
        ],
        "tools": [
            "cc65",
            "VICE",
            "KickC"
        ],
        "scores": {
            "documentation": 92,
            "community": 88,
            "toolchain": 88,
            "debugLoop": 93,
            "abstraction": 78,
            "architecture": 54,
            "automation": 86,
            "assets": 86
        },
        "confidence": "high",
        "verdict": "Technically one of the easiest obscure consoles because it inherits the enormous C64 ecosystem.",
        "advantage": "Exceptional emulation, documentation, compilers and example code.",
        "friction": "Console cartridge boot assumptions, keyboardless UX and VIC/SID timing still need platform-specific validation.",
        "sources": [
            {
                "label": "cc65 supported targets",
                "url": "https://cc65.github.io/doc/cc65.html"
            },
            {
                "label": "VICE emulator",
                "url": "https://vice-emu.sourceforge.io/"
            }
        ],
        "scopeNote": ""
    },
    {
        "id": "gx4000",
        "name": "Amstrad GX4000",
        "short": "GX4000",
        "generation": 3,
        "kind": "console",
        "year": 1990,
        "region": "Europe",
        "cpu": "Z80A + Amstrad Plus ASIC",
        "languages": [
            "C",
            "Z80 assembly"
        ],
        "tools": [
            "SDCC",
            "CPCTelera",
            "WinAPE"
        ],
        "scores": {
            "documentation": 76,
            "community": 62,
            "toolchain": 74,
            "debugLoop": 84,
            "abstraction": 76,
            "architecture": 64,
            "automation": 73,
            "assets": 72
        },
        "confidence": "medium",
        "verdict": "CPCTelera makes this much more practical than its market footprint suggests.",
        "advantage": "C tooling and strong CPC-family documentation provide a workable agent loop.",
        "friction": "Cartridge packaging and Plus-only ASIC features have a smaller tested corpus.",
        "sources": [
            {
                "label": "CPCWiki programming reference",
                "url": "https://www.cpcwiki.eu/index.php/Programming"
            },
            {
                "label": "CPCTelera",
                "url": "https://lronaldo.github.io/cpctelera/"
            }
        ],
        "scopeNote": ""
    },
    {
        "id": "genesis",
        "name": "Sega Genesis / Mega Drive",
        "short": "Genesis",
        "generation": 4,
        "kind": "console",
        "year": 1988,
        "region": "Global",
        "cpu": "Motorola 68000 + Z80",
        "languages": [
            "C",
            "68000 assembly"
        ],
        "tools": [
            "SGDK",
            "BlastEm",
            "Genesis Plus GX"
        ],
        "scores": {
            "documentation": 94,
            "community": 90,
            "toolchain": 94,
            "debugLoop": 91,
            "abstraction": 90,
            "architecture": 78,
            "automation": 92,
            "assets": 92
        },
        "confidence": "high",
        "verdict": "Top-tier retro target: modern SGDK, strong samples, asset tools and familiar 68000 code.",
        "advantage": "A coding agent can scaffold, build, convert assets and test in a tight loop.",
        "friction": "VDP bandwidth, DMA scheduling and Z80 audio handoff still need profiling.",
        "sources": [
            {
                "label": "SGDK",
                "url": "https://github.com/Stephane-D/SGDK"
            }
        ],
        "scopeNote": ""
    },
    {
        "id": "segacd",
        "name": "Sega CD / Mega-CD",
        "short": "Sega CD",
        "generation": 4,
        "kind": "add-on",
        "year": 1991,
        "region": "Global",
        "cpu": "Dual 68000 + CD subsystem",
        "languages": [
            "C",
            "68000 assembly"
        ],
        "tools": [
            "SGDK extensions",
            "GCC",
            "BlastEm"
        ],
        "scores": {
            "documentation": 70,
            "community": 57,
            "toolchain": 59,
            "debugLoop": 67,
            "abstraction": 55,
            "architecture": 38,
            "automation": 58,
            "assets": 58
        },
        "confidence": "medium",
        "verdict": "Reasonable for constrained 2D projects, but dual-CPU coordination and CD BIOS work reduce automation.",
        "advantage": "Genesis knowledge, 68000 tooling and emulator support carry over.",
        "friction": "Sub-CPU protocol, disc layout, streaming and PCM/CD audio examples are fragmented.",
        "sources": [
            {
                "label": "SGDK",
                "url": "https://github.com/Stephane-D/SGDK"
            },
            {
                "label": "Mega-CD development resources",
                "url": "https://www.retroreversing.com/sega-mega-cd-development"
            }
        ],
        "scopeNote": ""
    },
    {
        "id": "sega32x",
        "name": "Sega 32X",
        "short": "32X",
        "generation": 4,
        "kind": "add-on",
        "year": 1994,
        "region": "Global",
        "cpu": "Dual SH-2 + 68000/Z80 base",
        "languages": [
            "C",
            "SH-2 assembly"
        ],
        "tools": [
            "GCC",
            "D32XR",
            "PicoDrive"
        ],
        "scores": {
            "documentation": 58,
            "community": 44,
            "toolchain": 54,
            "debugLoop": 62,
            "abstraction": 48,
            "architecture": 30,
            "automation": 49,
            "assets": 50
        },
        "confidence": "medium",
        "verdict": "Buildable with modern GCC, but synchronization across five processors is hostile to unattended agents.",
        "advantage": "SH-2 C code and emulator testing are available.",
        "friction": "Framebuffer bandwidth, cache behavior and multi-CPU ownership are easy to hallucinate.",
        "sources": [
            {
                "label": "D32XR SDK",
                "url": "https://github.com/viciious/d32xr"
            }
        ],
        "scopeNote": ""
    },
    {
        "id": "snes",
        "name": "Super Nintendo / Super Famicom",
        "short": "SNES",
        "generation": 4,
        "kind": "console",
        "year": 1990,
        "region": "Global",
        "cpu": "Ricoh 5A22 (65816) + PPU/APU",
        "languages": [
            "C",
            "65816 assembly"
        ],
        "tools": [
            "PVSnesLib",
            "WLA-DX",
            "Mesen-S",
            "bsnes-plus"
        ],
        "scores": {
            "documentation": 96,
            "community": 93,
            "toolchain": 80,
            "debugLoop": 92,
            "abstraction": 73,
            "architecture": 49,
            "automation": 82,
            "assets": 87
        },
        "confidence": "high",
        "verdict": "Extremely well documented; slightly less agent-friendly than Genesis because CPU and audio constraints surface sooner.",
        "advantage": "Mature emulators, huge ROM-hacking corpus and usable C libraries.",
        "friction": "65816 modes, DMA/HDMA timing, SPC700 audio and enhancement chips need explicit boundaries.",
        "sources": [
            {
                "label": "PVSnesLib",
                "url": "https://github.com/alekmaul/pvsneslib"
            },
            {
                "label": "SNESdev Wiki",
                "url": "https://snes.nesdev.org/wiki/SNESdev_Wiki"
            }
        ],
        "scopeNote": ""
    },
    {
        "id": "satellaview",
        "name": "Satellaview",
        "short": "Satellaview",
        "generation": 4,
        "kind": "add-on",
        "year": 1995,
        "region": "Japan",
        "cpu": "SNES + BS-X broadcast/storage hardware",
        "languages": [
            "C",
            "65816 assembly"
        ],
        "tools": [
            "PVSnesLib",
            "bsnes-plus",
            "Community packers"
        ],
        "scores": {
            "documentation": 63,
            "community": 44,
            "toolchain": 55,
            "debugLoop": 71,
            "abstraction": 45,
            "architecture": 41,
            "automation": 49,
            "assets": 46
        },
        "confidence": "low",
        "verdict": "Standard SNES games are feasible; authentic broadcast and memory-pack behavior is much harder.",
        "advantage": "SNES development knowledge transfers.",
        "friction": "BS-X BIOS services, flash packs and broadcast scheduling are niche and incompletely preserved.",
        "sources": [
            {
                "label": "Satellaview reference",
                "url": "https://snes.nesdev.org/wiki/Satellaview"
            }
        ],
        "scopeNote": ""
    },
    {
        "id": "pce",
        "name": "PC Engine / TurboGrafx-16",
        "short": "PC Engine",
        "generation": 4,
        "kind": "console",
        "year": 1987,
        "region": "Japan / North America",
        "cpu": "HuC6280 + HuC6270 VDC",
        "languages": [
            "C",
            "HuC6280 assembly"
        ],
        "tools": [
            "HuC",
            "cc65",
            "Mednafen"
        ],
        "scores": {
            "documentation": 81,
            "community": 67,
            "toolchain": 72,
            "debugLoop": 84,
            "abstraction": 66,
            "architecture": 61,
            "automation": 72,
            "assets": 69
        },
        "confidence": "medium",
        "verdict": "A solid 2D target with a supported C path, but fewer modern examples than Nintendo or Sega peers.",
        "advantage": "6502-family knowledge and cc65 support make automation practical.",
        "friction": "HuC6280 extensions, multiple VDC variants and smaller community reduce validation coverage.",
        "sources": [
            {
                "label": "cc65 PC Engine guide",
                "url": "https://cc65.github.io/doc/pce.html"
            },
            {
                "label": "cc65 supported targets",
                "url": "https://cc65.github.io/doc/cc65.html"
            }
        ],
        "scopeNote": ""
    },
    {
        "id": "pcecd",
        "name": "PC Engine CD / TurboGrafx-CD",
        "short": "PCE CD",
        "generation": 4,
        "kind": "add-on",
        "year": 1988,
        "region": "Japan / North America",
        "cpu": "HuC6280 + CD-ROM² BIOS",
        "languages": [
            "C",
            "HuC6280 assembly"
        ],
        "tools": [
            "HuC",
            "Mednafen",
            "CD BIOS tools"
        ],
        "scores": {
            "documentation": 67,
            "community": 51,
            "toolchain": 59,
            "debugLoop": 70,
            "abstraction": 50,
            "architecture": 47,
            "automation": 56,
            "assets": 57
        },
        "confidence": "medium",
        "verdict": "Usable for conventional games, but CD BIOS and streaming workflows are sparsely standardized.",
        "advantage": "Base PCE tooling and Mednafen debugging help.",
        "friction": "Disc image authoring, ADPCM and system-card differences increase agent failure modes.",
        "sources": [
            {
                "label": "cc65 PC Engine guide",
                "url": "https://cc65.github.io/doc/pce.html"
            },
            {
                "label": "PCE development wiki",
                "url": "https://github.com/pce-devel/huc/wiki"
            }
        ],
        "scopeNote": ""
    },
    {
        "id": "supergrafx",
        "name": "PC Engine SuperGrafx",
        "short": "SuperGrafx",
        "generation": 4,
        "kind": "console",
        "year": 1989,
        "region": "Japan",
        "cpu": "HuC6280 + dual VDCs",
        "languages": [
            "C",
            "HuC6280 assembly"
        ],
        "tools": [
            "HuC",
            "Mednafen"
        ],
        "scores": {
            "documentation": 58,
            "community": 38,
            "toolchain": 52,
            "debugLoop": 67,
            "abstraction": 43,
            "architecture": 33,
            "automation": 47,
            "assets": 48
        },
        "confidence": "low",
        "verdict": "Base PCE work is transferable; exploiting the second VDC is a niche specialist task.",
        "advantage": "Same CPU and much of the same build chain as PC Engine.",
        "friction": "Very small software corpus and scarce dual-VDC examples.",
        "sources": [
            {
                "label": "SuperGrafx technical overview",
                "url": "https://en.wikipedia.org/wiki/PC_Engine_SuperGrafx"
            },
            {
                "label": "cc65 PC Engine guide",
                "url": "https://cc65.github.io/doc/pce.html"
            }
        ],
        "scopeNote": ""
    },
    {
        "id": "neogeo",
        "name": "Neo Geo AES / MVS",
        "short": "Neo Geo",
        "generation": 4,
        "kind": "console",
        "year": 1990,
        "region": "Global arcade / home",
        "cpu": "68000 + Z80 + YM2610",
        "languages": [
            "C",
            "68000 assembly"
        ],
        "tools": [
            "ngdevkit",
            "NeoGeoSDK",
            "MAME"
        ],
        "scores": {
            "documentation": 76,
            "community": 67,
            "toolchain": 72,
            "debugLoop": 83,
            "abstraction": 63,
            "architecture": 56,
            "automation": 70,
            "assets": 75
        },
        "confidence": "medium",
        "verdict": "Modern open SDKs and MAME targets make 2D work realistic, though the sprite-centric architecture is unusual.",
        "advantage": "68000 familiarity, reproducible ROM builds and improving asset/audio pipelines.",
        "friction": "FIX layer, sprite chains, ROM partitions and Z80/YM2610 audio require domain-specific prompting.",
        "sources": [
            {
                "label": "ngdevkit",
                "url": "https://github.com/dciabrin/ngdevkit"
            },
            {
                "label": "NeoGeoSDK",
                "url": "https://github.com/eaglesoftware777/neogeosdk"
            }
        ],
        "scopeNote": ""
    },
    {
        "id": "neogeocd",
        "name": "Neo Geo CD",
        "short": "Neo Geo CD",
        "generation": 4,
        "kind": "console",
        "year": 1994,
        "region": "Global",
        "cpu": "Neo Geo architecture + CD drive",
        "languages": [
            "C",
            "68000 assembly"
        ],
        "tools": [
            "ngdevkit branches",
            "MAME",
            "CD tools"
        ],
        "scores": {
            "documentation": 58,
            "community": 43,
            "toolchain": 51,
            "debugLoop": 68,
            "abstraction": 43,
            "architecture": 45,
            "automation": 48,
            "assets": 52
        },
        "confidence": "low",
        "verdict": "Core hardware is known, but CD-specific loading and packaging remain less standardized.",
        "advantage": "Neo Geo graphics and sound knowledge transfers.",
        "friction": "CD BIOS interfaces, load management and smaller homebrew corpus lower reliability.",
        "sources": [
            {
                "label": "ngdevkit",
                "url": "https://github.com/dciabrin/ngdevkit"
            },
            {
                "label": "Neo Geo CD development notes",
                "url": "https://www.ajworld.net/neogeodev/"
            }
        ],
        "scopeNote": ""
    },
    {
        "id": "cdi",
        "name": "Philips CD-i",
        "short": "CD-i",
        "generation": 4,
        "kind": "console",
        "year": 1991,
        "region": "Global",
        "cpu": "68070 + CD-RTOS + custom video",
        "languages": [
            "C",
            "68000 assembly"
        ],
        "tools": [
            "CD-i SDK archives",
            "CD-i Emulator"
        ],
        "scores": {
            "documentation": 47,
            "community": 31,
            "toolchain": 38,
            "debugLoop": 53,
            "abstraction": 34,
            "architecture": 40,
            "automation": 36,
            "assets": 42
        },
        "confidence": "low",
        "verdict": "A real C-based OS exists, but legal archival friction and a tiny active scene limit agent effectiveness.",
        "advantage": "OS abstractions are more conventional than many contemporaries.",
        "friction": "Toolchain acquisition, undocumented multimedia behavior and scarce open examples dominate.",
        "sources": [
            {
                "label": "CD-i development resources",
                "url": "https://www.cdiemu.org/"
            }
        ],
        "scopeNote": ""
    },
    {
        "id": "gameboy",
        "name": "Nintendo Game Boy",
        "short": "Game Boy",
        "generation": 4,
        "kind": "handheld",
        "year": 1989,
        "region": "Global",
        "cpu": "Sharp SM83",
        "languages": [
            "C",
            "SM83 assembly"
        ],
        "tools": [
            "GBDK-2020",
            "RGBDS",
            "BGB",
            "Emulicious",
            "GB Studio"
        ],
        "scores": {
            "documentation": 99,
            "community": 97,
            "toolchain": 96,
            "debugLoop": 98,
            "abstraction": 94,
            "architecture": 80,
            "automation": 97,
            "assets": 96
        },
        "confidence": "high",
        "verdict": "The strongest overall target for unattended AI-assisted retro development.",
        "advantage": "Outstanding docs, visual and code-first engines, source debugging, examples and fast emulation.",
        "friction": "Banking, scanline limits and SM83-vs-Z80 instruction differences still require tests.",
        "sources": [
            {
                "label": "GBDK-2020 supported consoles",
                "url": "https://gbdk.org/docs/api/docs_supported_consoles.html"
            },
            {
                "label": "Pan Docs",
                "url": "https://gbdev.io/pandocs/"
            },
            {
                "label": "GB Studio",
                "url": "https://www.gbstudio.dev/"
            }
        ],
        "scopeNote": ""
    },
    {
        "id": "gbc",
        "name": "Nintendo Game Boy Color",
        "short": "Game Boy Color",
        "generation": 4,
        "kind": "handheld",
        "year": 1998,
        "region": "Global",
        "cpu": "SM83 with double-speed mode",
        "languages": [
            "C",
            "SM83 assembly"
        ],
        "tools": [
            "GBDK-2020",
            "RGBDS",
            "BGB",
            "Emulicious",
            "GB Studio"
        ],
        "scores": {
            "documentation": 98,
            "community": 95,
            "toolchain": 95,
            "debugLoop": 97,
            "abstraction": 92,
            "architecture": 77,
            "automation": 96,
            "assets": 95
        },
        "confidence": "high",
        "verdict": "Nearly as agent-friendly as Game Boy, with modest complexity from palettes, banks and CGB modes.",
        "advantage": "Shares the same mature ecosystem and source-debug path.",
        "friction": "VRAM banking, compatibility modes and color constraints add state the agent must model.",
        "sources": [
            {
                "label": "GBDK-2020 supported consoles",
                "url": "https://gbdk.org/docs/api/docs_supported_consoles.html"
            },
            {
                "label": "Pan Docs CGB section",
                "url": "https://gbdev.io/pandocs/CGB_Registers.html"
            }
        ],
        "scopeNote": ""
    },
    {
        "id": "gamegear",
        "name": "Sega Game Gear",
        "short": "Game Gear",
        "generation": 4,
        "kind": "handheld",
        "year": 1990,
        "region": "Global",
        "cpu": "Z80 + Sega VDP",
        "languages": [
            "C",
            "Z80 assembly"
        ],
        "tools": [
            "GBDK-2020",
            "devkitSMS",
            "Emulicious"
        ],
        "scores": {
            "documentation": 87,
            "community": 72,
            "toolchain": 84,
            "debugLoop": 90,
            "abstraction": 78,
            "architecture": 73,
            "automation": 83,
            "assets": 79
        },
        "confidence": "high",
        "verdict": "A strong handheld target thanks to shared Master System tooling and modern GBDK support.",
        "advantage": "C source debugging and cross-platform examples are excellent.",
        "friction": "Viewport, palette and cartridge assumptions differ from Master System and need explicit tests.",
        "sources": [
            {
                "label": "GBDK-2020 supported consoles",
                "url": "https://gbdk.org/docs/api/docs_supported_consoles.html"
            },
            {
                "label": "SMS Power development reference",
                "url": "https://www.smspower.org/Development/Index"
            }
        ],
        "scopeNote": ""
    },
    {
        "id": "lynx",
        "name": "Atari Lynx",
        "short": "Lynx",
        "generation": 4,
        "kind": "handheld",
        "year": 1989,
        "region": "Global",
        "cpu": "65C02 + Suzy/Mikey custom chips",
        "languages": [
            "C",
            "65C02 assembly"
        ],
        "tools": [
            "cc65",
            "Handy",
            "Mednafen"
        ],
        "scores": {
            "documentation": 78,
            "community": 61,
            "toolchain": 78,
            "debugLoop": 78,
            "abstraction": 70,
            "architecture": 47,
            "automation": 69,
            "assets": 72
        },
        "confidence": "medium",
        "verdict": "cc65 makes first-party-style C development approachable; custom blitter/audio behavior limits deeper automation.",
        "advantage": "Documented C runtime and emulator support provide a repeatable loop.",
        "friction": "Suzy/Mikey quirks, sprite engine details and small community reduce corrective feedback.",
        "sources": [
            {
                "label": "cc65 Lynx guide",
                "url": "https://cc65.github.io/doc/lynx.html"
            },
            {
                "label": "cc65 supported targets",
                "url": "https://cc65.github.io/doc/cc65.html"
            }
        ],
        "scopeNote": ""
    },
    {
        "id": "supervision",
        "name": "Watara Supervision",
        "short": "Supervision",
        "generation": 4,
        "kind": "handheld",
        "year": 1992,
        "region": "Global budget market",
        "cpu": "65C02-family",
        "languages": [
            "C",
            "6502 assembly"
        ],
        "tools": [
            "cc65",
            "Potator",
            "MAME"
        ],
        "scores": {
            "documentation": 65,
            "community": 39,
            "toolchain": 72,
            "debugLoop": 63,
            "abstraction": 62,
            "architecture": 64,
            "automation": 58,
            "assets": 54
        },
        "confidence": "medium",
        "verdict": "Surprisingly viable because cc65 has a first-class target, despite a tiny platform community.",
        "advantage": "Standardized compiler target and relatively simple monochrome hardware.",
        "friction": "Few polished examples, limited debugging workflows and inconsistent clone hardware.",
        "sources": [
            {
                "label": "cc65 supported targets",
                "url": "https://cc65.github.io/doc/cc65.html"
            },
            {
                "label": "cc65 Supervision guide",
                "url": "https://cc65.github.io/doc/supervision.html"
            }
        ],
        "scopeNote": ""
    },
    {
        "id": "megaduck",
        "name": "Mega Duck / Cougar Boy",
        "short": "Mega Duck",
        "generation": 4,
        "kind": "handheld",
        "year": 1993,
        "region": "Europe / South America",
        "cpu": "SM83-like",
        "languages": [
            "C",
            "SM83 assembly"
        ],
        "tools": [
            "GBDK-2020",
            "Emulicious"
        ],
        "scores": {
            "documentation": 76,
            "community": 35,
            "toolchain": 89,
            "debugLoop": 84,
            "abstraction": 84,
            "architecture": 78,
            "automation": 75,
            "assets": 70
        },
        "confidence": "medium",
        "verdict": "Tiny community, but exceptional toolchain leverage because GBDK supports it directly.",
        "advantage": "Game Boy-like architecture and cross-platform APIs let agents reuse known patterns.",
        "friction": "Hardware validation and audio/register differences have little real-world test coverage.",
        "sources": [
            {
                "label": "GBDK-2020 supported consoles",
                "url": "https://gbdk.org/docs/api/docs_supported_consoles.html"
            }
        ],
        "scopeNote": ""
    },
    {
        "id": "gamate",
        "name": "Bit Corp Gamate",
        "short": "Gamate",
        "generation": 4,
        "kind": "handheld",
        "year": 1990,
        "region": "Asia / Europe",
        "cpu": "6502-family",
        "languages": [
            "C",
            "6502 assembly"
        ],
        "tools": [
            "cc65",
            "MAME"
        ],
        "scores": {
            "documentation": 53,
            "community": 25,
            "toolchain": 67,
            "debugLoop": 55,
            "abstraction": 55,
            "architecture": 59,
            "automation": 48,
            "assets": 43
        },
        "confidence": "low",
        "verdict": "A supported cc65 target raises it above other obscure handhelds, but evidence remains thin.",
        "advantage": "Conventional CPU and a reproducible compiler path.",
        "friction": "Sparse platform libraries, examples, debugging guides and hardware validation.",
        "sources": [
            {
                "label": "cc65 supported targets",
                "url": "https://cc65.github.io/doc/cc65.html"
            },
            {
                "label": "cc65 Gamate guide",
                "url": "https://cc65.github.io/doc/gamate.html"
            }
        ],
        "scopeNote": ""
    },
    {
        "id": "ps1",
        "name": "Sony PlayStation",
        "short": "PlayStation",
        "generation": 5,
        "kind": "console",
        "year": 1994,
        "region": "Global",
        "cpu": "MIPS R3000A + GTE/GPU/SPU",
        "languages": [
            "C",
            "C++ subset",
            "MIPS assembly"
        ],
        "tools": [
            "PSn00bSDK",
            "PCSX-Redux",
            "DuckStation",
            "mkpsxiso"
        ],
        "scores": {
            "documentation": 94,
            "community": 91,
            "toolchain": 91,
            "debugLoop": 96,
            "abstraction": 82,
            "architecture": 58,
            "automation": 89,
            "assets": 90
        },
        "confidence": "high",
        "verdict": "Modern open SDKs and debugger-focused emulators make PS1 one of the best 3D-era targets.",
        "advantage": "CMake workflows, examples, live debugging and robust asset/disc tooling.",
        "friction": "Fixed-point math, ordering tables, no Z-buffer and SPU/CD streaming still need specialist checks.",
        "sources": [
            {
                "label": "PSn00bSDK",
                "url": "https://github.com/Lameguy64/PSn00bSDK"
            },
            {
                "label": "PCSX-Redux development tools",
                "url": "https://pcsx-redux.consoledev.net/"
            }
        ],
        "scopeNote": ""
    },
    {
        "id": "saturn",
        "name": "Sega Saturn",
        "short": "Saturn",
        "generation": 5,
        "kind": "console",
        "year": 1994,
        "region": "Global",
        "cpu": "Dual SH-2 + SCU DSP + VDP1/VDP2 + SCSP",
        "languages": [
            "C",
            "C++",
            "SH-2 assembly"
        ],
        "tools": [
            "libyaul",
            "Jo Engine",
            "Mednafen"
        ],
        "scores": {
            "documentation": 79,
            "community": 66,
            "toolchain": 76,
            "debugLoop": 84,
            "abstraction": 68,
            "architecture": 22,
            "automation": 59,
            "assets": 72
        },
        "confidence": "medium",
        "verdict": "Tooling has improved dramatically, but hardware complexity remains the defining automation bottleneck.",
        "advantage": "libyaul is active and ships an unusually broad example suite.",
        "friction": "Multi-CPU scheduling, two video chips, SCU DSP and SCSP audio create many hidden coupling errors.",
        "sources": [
            {
                "label": "libyaul",
                "url": "https://github.com/yaul-org/libyaul"
            },
            {
                "label": "libyaul examples",
                "url": "https://github.com/yaul-org/libyaul-examples"
            }
        ],
        "scopeNote": ""
    },
    {
        "id": "n64",
        "name": "Nintendo 64",
        "short": "N64",
        "generation": 5,
        "kind": "console",
        "year": 1996,
        "region": "Global",
        "cpu": "MIPS R4300i + RCP",
        "languages": [
            "C",
            "C++",
            "MIPS/RSP assembly"
        ],
        "tools": [
            "libdragon",
            "Ares",
            "SummerCart64"
        ],
        "scores": {
            "documentation": 91,
            "community": 86,
            "toolchain": 94,
            "debugLoop": 95,
            "abstraction": 87,
            "architecture": 42,
            "automation": 86,
            "assets": 89
        },
        "confidence": "high",
        "verdict": "libdragon has transformed N64 into a modern, agent-friendly SDK target despite exotic hardware.",
        "advantage": "Modern GCC/Newlib, Docker, strong examples, Ares homebrew checks and active community.",
        "friction": "RSP/RDP behavior, caches, DMA and advanced microcode remain hard to synthesize safely.",
        "sources": [
            {
                "label": "libdragon",
                "url": "https://github.com/DragonMinded/libdragon"
            }
        ],
        "scopeNote": ""
    },
    {
        "id": "64dd",
        "name": "Nintendo 64DD",
        "short": "64DD",
        "generation": 5,
        "kind": "add-on",
        "year": 1999,
        "region": "Japan",
        "cpu": "N64 + magnetic disk subsystem / RTC",
        "languages": [
            "C",
            "MIPS assembly"
        ],
        "tools": [
            "libdragon experimental work",
            "Ares",
            "Community tools"
        ],
        "scores": {
            "documentation": 55,
            "community": 35,
            "toolchain": 45,
            "debugLoop": 65,
            "abstraction": 35,
            "architecture": 31,
            "automation": 41,
            "assets": 38
        },
        "confidence": "low",
        "verdict": "Basic N64 code transfers, but authentic disk, filesystem and IPL behavior is niche.",
        "advantage": "Base N64 SDK and emulator improvements help.",
        "friction": "Limited public examples, specialized media and hardware access create a weak validation loop.",
        "sources": [
            {
                "label": "64DD development notes",
                "url": "https://n64brew.dev/wiki/64DD"
            },
            {
                "label": "libdragon",
                "url": "https://github.com/DragonMinded/libdragon"
            }
        ],
        "scopeNote": ""
    },
    {
        "id": "jaguar",
        "name": "Atari Jaguar",
        "short": "Jaguar",
        "generation": 5,
        "kind": "console",
        "year": 1993,
        "region": "Global",
        "cpu": "68000 + GPU/DSP custom RISC chips",
        "languages": [
            "C",
            "68000/GPU/DSP assembly",
            "BASIC-like"
        ],
        "tools": [
            "JagStudio",
            "rmac/rln",
            "Virtual Jaguar",
            "BigPEmu"
        ],
        "scores": {
            "documentation": 72,
            "community": 55,
            "toolchain": 66,
            "debugLoop": 76,
            "abstraction": 63,
            "architecture": 20,
            "automation": 49,
            "assets": 65
        },
        "confidence": "medium",
        "verdict": "Modern community tools help prototypes, but performant code still demands unusually obscure hardware knowledge.",
        "advantage": "Cross-linked developer docs, modern assemblers and BigPEmu debugging improve iteration.",
        "friction": "Buggy silicon, object processor rules and custom GPU/DSP assembly are low-corpus, high-risk domains.",
        "sources": [
            {
                "label": "Atari Jaguar Developer Reference",
                "url": "https://asterick.github.io/jag-docs/"
            },
            {
                "label": "JagStudio",
                "url": "https://github.com/atari-jaguar-sdk/JagStudio"
            }
        ],
        "scopeNote": ""
    },
    {
        "id": "jaguarcd",
        "name": "Atari Jaguar CD",
        "short": "Jaguar CD",
        "generation": 5,
        "kind": "add-on",
        "year": 1995,
        "region": "Global",
        "cpu": "Jaguar + CD-ROM subsystem",
        "languages": [
            "C",
            "Assembly"
        ],
        "tools": [
            "JagStudio",
            "rmac/rln",
            "BigPEmu"
        ],
        "scores": {
            "documentation": 53,
            "community": 35,
            "toolchain": 51,
            "debugLoop": 65,
            "abstraction": 45,
            "architecture": 17,
            "automation": 38,
            "assets": 48
        },
        "confidence": "low",
        "verdict": "All Jaguar difficulty remains, plus sparse CD BIOS and image-authoring knowledge.",
        "advantage": "Base Jaguar tools can still produce and debug code.",
        "friction": "Disc boot, streaming, encryption/format details and tiny hardware population weaken verification.",
        "sources": [
            {
                "label": "Atari Jaguar Developer Reference",
                "url": "https://asterick.github.io/jag-docs/"
            }
        ],
        "scopeNote": ""
    },
    {
        "id": "3do",
        "name": "3DO Interactive Multiplayer",
        "short": "3DO",
        "generation": 5,
        "kind": "console",
        "year": 1993,
        "region": "Global",
        "cpu": "ARM60 + CEL engine + Portfolio OS",
        "languages": [
            "C",
            "ARM assembly"
        ],
        "tools": [
            "Portfolio SDK archives",
            "Opera/4DO"
        ],
        "scores": {
            "documentation": 58,
            "community": 40,
            "toolchain": 52,
            "debugLoop": 63,
            "abstraction": 55,
            "architecture": 44,
            "automation": 47,
            "assets": 56
        },
        "confidence": "low",
        "verdict": "Architecturally more OS-like than many peers, but the open modern ecosystem is fragmented.",
        "advantage": "C APIs, ARM code and filesystem abstractions are understandable to agents.",
        "friction": "SDK preservation, CEL rendering specifics and limited debuggers/examples reduce reliability.",
        "sources": [
            {
                "label": "3DO development archive",
                "url": "https://github.com/trapexit/portfolio_os"
            }
        ],
        "scopeNote": ""
    },
    {
        "id": "amigacd32",
        "name": "Commodore Amiga CD32",
        "short": "Amiga CD32",
        "generation": 5,
        "kind": "console",
        "year": 1993,
        "region": "Europe",
        "cpu": "Motorola 68EC020 + AGA chipset",
        "languages": [
            "C",
            "C++",
            "68020 assembly"
        ],
        "tools": [
            "VBCC",
            "GCC",
            "WinUAE",
            "Amiga toolchains"
        ],
        "scores": {
            "documentation": 86,
            "community": 77,
            "toolchain": 80,
            "debugLoop": 88,
            "abstraction": 73,
            "architecture": 47,
            "automation": 76,
            "assets": 79
        },
        "confidence": "high",
        "verdict": "Inherits decades of Amiga development knowledge, making it far easier than its console sales suggest.",
        "advantage": "Excellent emulation, mature 68k compilers and abundant reusable Amiga code.",
        "friction": "AGA copper/blitter timing, controller/CD boot specifics and memory discipline remain specialized.",
        "sources": [
            {
                "label": "Amiga Developer Docs",
                "url": "https://amigadev.elowar.com/"
            },
            {
                "label": "VBCC",
                "url": "http://sun.hasenbraten.de/vbcc/"
            }
        ],
        "scopeNote": ""
    },
    {
        "id": "fmtownsmarty",
        "name": "FM Towns Marty",
        "short": "FM Towns Marty",
        "generation": 5,
        "kind": "console",
        "year": 1993,
        "region": "Japan",
        "cpu": "Intel 386SX + FM Towns multimedia hardware",
        "languages": [
            "C",
            "x86 assembly"
        ],
        "tools": [
            "GCC/DOS tools",
            "Tsugaru"
        ],
        "scores": {
            "documentation": 54,
            "community": 35,
            "toolchain": 56,
            "debugLoop": 64,
            "abstraction": 58,
            "architecture": 66,
            "automation": 51,
            "assets": 48
        },
        "confidence": "low",
        "verdict": "Familiar x86 helps, but Japanese documentation and platform-specific multimedia APIs limit automation.",
        "advantage": "Conventional CPU, DOS-like concepts and improving emulation.",
        "friction": "Boot media, graphics/audio APIs and validated homebrew examples are fragmented.",
        "sources": [
            {
                "label": "Tsugaru emulator",
                "url": "https://github.com/captainys/TOWNSEMU"
            }
        ],
        "scopeNote": ""
    },
    {
        "id": "pcfx",
        "name": "NEC PC-FX",
        "short": "PC-FX",
        "generation": 5,
        "kind": "console",
        "year": 1994,
        "region": "Japan",
        "cpu": "NEC V810 + custom video codecs",
        "languages": [
            "C",
            "V810 assembly"
        ],
        "tools": [
            "GCC ports",
            "Mednafen"
        ],
        "scores": {
            "documentation": 42,
            "community": 25,
            "toolchain": 37,
            "debugLoop": 57,
            "abstraction": 31,
            "architecture": 38,
            "automation": 32,
            "assets": 36
        },
        "confidence": "low",
        "verdict": "A known CPU and emulator exist, but there is no dominant beginner-friendly SDK.",
        "advantage": "V810 knowledge overlaps Virtual Boy and Mednafen supports testing.",
        "friction": "Sparse English docs, unusual video pipeline and minimal homebrew corpus.",
        "sources": [
            {
                "label": "PC-FX development overview",
                "url": "https://www.retroreversing.com/pc-fx-development"
            }
        ],
        "scopeNote": ""
    },
    {
        "id": "pippin",
        "name": "Apple Bandai Pippin",
        "short": "Pippin",
        "generation": 5,
        "kind": "console",
        "year": 1996,
        "region": "Japan / North America",
        "cpu": "PowerPC 603 + classic Mac OS",
        "languages": [
            "C",
            "C++",
            "PowerPC assembly"
        ],
        "tools": [
            "Metrowerks CodeWarrior archives",
            "SheepShaver/MAME"
        ],
        "scores": {
            "documentation": 49,
            "community": 28,
            "toolchain": 43,
            "debugLoop": 49,
            "abstraction": 62,
            "architecture": 63,
            "automation": 39,
            "assets": 44
        },
        "confidence": "low",
        "verdict": "Classic Mac familiarity helps, but Pippin-specific boot, media and controller knowledge is scarce.",
        "advantage": "High-level OS APIs and PowerPC C/C++ are AI-familiar.",
        "friction": "Tool licensing/archives, authenticated discs and tiny hardware corpus limit reproducibility.",
        "sources": [
            {
                "label": "Pippin development overview",
                "url": "https://www.retroreversing.com/bandai-pippin-development"
            }
        ],
        "scopeNote": ""
    },
    {
        "id": "playdia",
        "name": "Bandai Playdia",
        "short": "Playdia",
        "generation": 5,
        "kind": "console",
        "year": 1994,
        "region": "Japan",
        "cpu": "8-bit CPU + CD video hardware",
        "languages": [
            "Assembly"
        ],
        "tools": [
            "MAME",
            "Reverse-engineered tools"
        ],
        "scores": {
            "documentation": 24,
            "community": 13,
            "toolchain": 18,
            "debugLoop": 37,
            "abstraction": 13,
            "architecture": 42,
            "automation": 18,
            "assets": 20
        },
        "confidence": "low",
        "verdict": "Not a practical target for autonomous development beyond preservation experiments.",
        "advantage": "Emulation and disc-format research exist.",
        "friction": "No mainstream SDK, minimal programming model documentation and highly specialized video-centric design.",
        "sources": [
            {
                "label": "Playdia overview",
                "url": "https://en.wikipedia.org/wiki/Playdia"
            }
        ],
        "scopeNote": ""
    },
    {
        "id": "loopy",
        "name": "Casio Loopy",
        "short": "Loopy",
        "generation": 5,
        "kind": "console",
        "year": 1995,
        "region": "Japan",
        "cpu": "SH-1-family + custom graphics/printer hardware",
        "languages": [
            "C",
            "SH assembly"
        ],
        "tools": [
            "MAME",
            "Community reverse engineering"
        ],
        "scores": {
            "documentation": 29,
            "community": 17,
            "toolchain": 22,
            "debugLoop": 40,
            "abstraction": 17,
            "architecture": 44,
            "automation": 22,
            "assets": 26
        },
        "confidence": "low",
        "verdict": "Technically programmable, but the lack of a maintained SDK makes agent automation speculative.",
        "advantage": "SH-family knowledge transfers in principle.",
        "friction": "Very little public code, printer/graphics specifics and scarce hardware validation.",
        "sources": [
            {
                "label": "Casio Loopy overview",
                "url": "https://en.wikipedia.org/wiki/Casio_Loopy"
            }
        ],
        "scopeNote": ""
    },
    {
        "id": "virtualboy",
        "name": "Nintendo Virtual Boy",
        "short": "Virtual Boy",
        "generation": 5,
        "kind": "handheld",
        "year": 1995,
        "region": "Global",
        "cpu": "NEC V810 + dual LED displays",
        "languages": [
            "C",
            "C++",
            "V810 assembly"
        ],
        "tools": [
            "VUEngine",
            "GCC",
            "Mednafen"
        ],
        "scores": {
            "documentation": 72,
            "community": 58,
            "toolchain": 71,
            "debugLoop": 78,
            "abstraction": 83,
            "architecture": 55,
            "automation": 68,
            "assets": 68
        },
        "confidence": "medium",
        "verdict": "VUEngine provides unusually high abstraction for a niche system, enabling fast agent prototypes.",
        "advantage": "Engine templates, components and emulator support hide much low-level setup.",
        "friction": "Stereo display constraints, timing and small community can make generated assumptions go unchallenged.",
        "sources": [
            {
                "label": "VUEngine Studio",
                "url": "https://github.com/VUEngine/VUEngine-Studio"
            },
            {
                "label": "Virtual Boy development wiki",
                "url": "https://www.virtual-boy.com/tools/"
            }
        ],
        "scopeNote": ""
    },
    {
        "id": "ngp",
        "name": "Neo Geo Pocket",
        "short": "NGP",
        "generation": 5,
        "kind": "handheld",
        "year": 1998,
        "region": "Japan / Europe",
        "cpu": "TLCS-900/H + Z80 audio",
        "languages": [
            "C",
            "TLCS-900 assembly"
        ],
        "tools": [
            "Community NGP SDKs",
            "Mednafen"
        ],
        "scores": {
            "documentation": 52,
            "community": 38,
            "toolchain": 45,
            "debugLoop": 61,
            "abstraction": 46,
            "architecture": 52,
            "automation": 43,
            "assets": 43
        },
        "confidence": "low",
        "verdict": "Reasonable for small 2D projects with an existing template, but poor as a greenfield autonomous target.",
        "advantage": "Simple display model and C compiler paths exist.",
        "friction": "Obscure CPU, fragmented SDKs and limited modern source debugging.",
        "sources": [
            {
                "label": "Neo Geo Pocket development resources",
                "url": "https://www.ajworld.net/neogeodev/ngpc.html"
            }
        ],
        "scopeNote": ""
    },
    {
        "id": "ngpc",
        "name": "Neo Geo Pocket Color",
        "short": "NGPC",
        "generation": 5,
        "kind": "handheld",
        "year": 1999,
        "region": "Global",
        "cpu": "TLCS-900/H + Z80 audio",
        "languages": [
            "C",
            "TLCS-900 assembly"
        ],
        "tools": [
            "Community NGP SDKs",
            "Mednafen"
        ],
        "scores": {
            "documentation": 56,
            "community": 44,
            "toolchain": 48,
            "debugLoop": 64,
            "abstraction": 49,
            "architecture": 50,
            "automation": 47,
            "assets": 48
        },
        "confidence": "low",
        "verdict": "Color support and a slightly larger scene help, but the toolchain remains niche.",
        "advantage": "Straightforward 2D hardware and some open-source game code.",
        "friction": "CPU/compiler knowledge, audio and debugging remain thinly documented.",
        "sources": [
            {
                "label": "Neo Geo Pocket development resources",
                "url": "https://www.ajworld.net/neogeodev/ngpc.html"
            }
        ],
        "scopeNote": ""
    },
    {
        "id": "wonderswan",
        "name": "Bandai WonderSwan",
        "short": "WonderSwan",
        "generation": 5,
        "kind": "handheld",
        "year": 1999,
        "region": "Japan",
        "cpu": "NEC V30MZ (x86-compatible)",
        "languages": [
            "C",
            "C++",
            "x86 assembly"
        ],
        "tools": [
            "Wonderful Toolchain",
            "Mednafen"
        ],
        "scores": {
            "documentation": 79,
            "community": 58,
            "toolchain": 78,
            "debugLoop": 78,
            "abstraction": 72,
            "architecture": 72,
            "automation": 72,
            "assets": 67
        },
        "confidence": "medium",
        "verdict": "A modern toolchain and x86-like CPU make this a strong niche handheld choice.",
        "advantage": "Wonderful provides packaging, docs and a contemporary first-program flow.",
        "friction": "Hardware rotation modes, banking and a smaller mostly Japanese corpus reduce confidence.",
        "sources": [
            {
                "label": "Wonderful Toolchain docs",
                "url": "https://wonderful.asie.pl/doc/general/"
            },
            {
                "label": "WonderSwan first-program tutorial",
                "url": "https://wonderful.asie.pl/wiki/doku.php?id=wswan:tutorial:your_first_program"
            }
        ],
        "scopeNote": ""
    },
    {
        "id": "wonderswancolor",
        "name": "Bandai WonderSwan Color",
        "short": "WonderSwan Color",
        "generation": 5,
        "kind": "handheld",
        "year": 2000,
        "region": "Japan",
        "cpu": "NEC V30MZ + color video",
        "languages": [
            "C",
            "C++",
            "x86 assembly"
        ],
        "tools": [
            "Wonderful Toolchain",
            "Mednafen"
        ],
        "scores": {
            "documentation": 80,
            "community": 60,
            "toolchain": 79,
            "debugLoop": 79,
            "abstraction": 73,
            "architecture": 69,
            "automation": 73,
            "assets": 70
        },
        "confidence": "medium",
        "verdict": "Similar to WonderSwan with better visual headroom and the same modern toolchain.",
        "advantage": "Shared compiler, docs and emulator workflow.",
        "friction": "Color memory modes and limited large-project examples add uncertainty.",
        "sources": [
            {
                "label": "Wonderful Toolchain docs",
                "url": "https://wonderful.asie.pl/doc/general/"
            },
            {
                "label": "WonderSwan first-program tutorial",
                "url": "https://wonderful.asie.pl/wiki/doku.php?id=wswan:tutorial:your_first_program"
            }
        ],
        "scopeNote": ""
    },
    {
        "id": "gamecom",
        "name": "Tiger game.com",
        "short": "game.com",
        "generation": 5,
        "kind": "handheld",
        "year": 1997,
        "region": "North America / Europe",
        "cpu": "Sharp SM8521 + custom LCD",
        "languages": [
            "Assembly",
            "Experimental C"
        ],
        "tools": [
            "MAME",
            "Community assemblers"
        ],
        "scores": {
            "documentation": 26,
            "community": 16,
            "toolchain": 20,
            "debugLoop": 37,
            "abstraction": 15,
            "architecture": 42,
            "automation": 20,
            "assets": 22
        },
        "confidence": "low",
        "verdict": "A preservation/reverse-engineering project, not a realistic AI-first game-development target.",
        "advantage": "The hardware is emulated and a few technical notes exist.",
        "friction": "No mature SDK, poor display characteristics, scarce examples and little debugging support.",
        "sources": [
            {
                "label": "game.com overview",
                "url": "https://en.wikipedia.org/wiki/Game.com"
            }
        ],
        "scopeNote": ""
    },
    {
        "id": "pocketstation",
        "name": "Sony PocketStation",
        "short": "PocketStation",
        "generation": 5,
        "kind": "companion",
        "year": 1999,
        "region": "Japan",
        "cpu": "ARM7T + tiny LCD",
        "languages": [
            "C",
            "ARM assembly"
        ],
        "tools": [
            "Community SDKs",
            "No$psx/PCSX tools"
        ],
        "scores": {
            "documentation": 47,
            "community": 30,
            "toolchain": 42,
            "debugLoop": 50,
            "abstraction": 45,
            "architecture": 66,
            "automation": 44,
            "assets": 38
        },
        "confidence": "low",
        "verdict": "Familiar ARM architecture helps, but the companion-device ecosystem is very small.",
        "advantage": "CPU/toolchain concepts are conventional and PS1 integration is documented in fragments.",
        "friction": "Tiny display, PS1 transfer protocol, packaging and scarce standalone examples.",
        "sources": [
            {
                "label": "PocketStation development overview",
                "url": "https://www.retroreversing.com/pocketstation-development"
            }
        ],
        "scopeNote": ""
    },
    {
        "id": "dreamcast",
        "name": "Sega Dreamcast",
        "short": "Dreamcast",
        "generation": 6,
        "kind": "console",
        "year": 1998,
        "region": "Global",
        "cpu": "Hitachi SH-4 + ARM7 sound + PowerVR2",
        "languages": [
            "C",
            "C++",
            "SH-4 assembly"
        ],
        "tools": [
            "KallistiOS",
            "DreamSDK",
            "Flycast",
            "GLdc"
        ],
        "scores": {
            "documentation": 92,
            "community": 87,
            "toolchain": 91,
            "debugLoop": 91,
            "abstraction": 88,
            "architecture": 67,
            "automation": 89,
            "assets": 90
        },
        "confidence": "high",
        "verdict": "A top 3D-era target with an active open SDK, ports ecosystem and fast emulator iteration.",
        "advantage": "KallistiOS is maintained, C/C++ friendly and includes networking, audio, filesystem and graphics layers.",
        "friction": "PowerVR list submission, SH-4 cache behavior and hardware-vs-emulator edge cases still need profiling.",
        "sources": [
            {
                "label": "KallistiOS",
                "url": "https://github.com/KallistiOS/KallistiOS"
            },
            {
                "label": "DreamSDK",
                "url": "https://github.com/dreamsdk/dreamsdk"
            }
        ],
        "scopeNote": ""
    },
    {
        "id": "ps2",
        "name": "Sony PlayStation 2",
        "short": "PS2",
        "generation": 6,
        "kind": "console",
        "year": 2000,
        "region": "Global",
        "cpu": "Emotion Engine MIPS + VU0/VU1 + IOP",
        "languages": [
            "C",
            "C++",
            "MIPS/VU assembly"
        ],
        "tools": [
            "PS2SDK",
            "gsKit",
            "PCSX2",
            "Docker toolchain"
        ],
        "scores": {
            "documentation": 83,
            "community": 82,
            "toolchain": 82,
            "debugLoop": 87,
            "abstraction": 76,
            "architecture": 18,
            "automation": 64,
            "assets": 80
        },
        "confidence": "high",
        "verdict": "Simple 2D and moderate 3D are increasingly automatable; peak-performance rendering remains expert territory.",
        "advantage": "Active PS2SDK, containers, examples and PCSX2 debugging provide a real modern workflow.",
        "friction": "DMA chains, scratchpad, GS packets, VIF/VU microcode and multi-processor ownership are deeply nonstandard.",
        "sources": [
            {
                "label": "PS2SDK",
                "url": "https://github.com/ps2dev/ps2sdk"
            },
            {
                "label": "PS2 toolchain container",
                "url": "https://github.com/ps2dev/ps2toolchain/pkgs/container/ps2toolchain"
            }
        ],
        "scopeNote": ""
    },
    {
        "id": "gamecube",
        "name": "Nintendo GameCube",
        "short": "GameCube",
        "generation": 6,
        "kind": "console",
        "year": 2001,
        "region": "Global",
        "cpu": "PowerPC Gekko + ATI Flipper",
        "languages": [
            "C",
            "C++",
            "PowerPC assembly"
        ],
        "tools": [
            "devkitPPC",
            "libogc",
            "Dolphin"
        ],
        "scores": {
            "documentation": 88,
            "community": 82,
            "toolchain": 88,
            "debugLoop": 96,
            "abstraction": 80,
            "architecture": 54,
            "automation": 84,
            "assets": 84
        },
        "confidence": "high",
        "verdict": "Excellent emulator debugging and a stable C/C++ stack make GameCube highly agent-friendly.",
        "advantage": "devkitPro packaging, libogc APIs and Dolphin debugger reduce setup and feedback friction.",
        "friction": "GX state, texture formats, TEV combiners and cache/DMA behavior are unlike modern OpenGL.",
        "sources": [
            {
                "label": "devkitPro getting started",
                "url": "https://devkitpro.org/wiki/Getting_Started/devkitARM"
            },
            {
                "label": "libogc",
                "url": "https://github.com/devkitPro/libogc"
            },
            {
                "label": "Dolphin debugger docs",
                "url": "https://dolphin-emu.org/docs/guides/debugging/"
            }
        ],
        "scopeNote": ""
    },
    {
        "id": "xbox",
        "name": "Microsoft Xbox",
        "short": "Original Xbox",
        "generation": 6,
        "kind": "console",
        "year": 2001,
        "region": "Global",
        "cpu": "x86 Coppermine-class + NVIDIA NV2A",
        "languages": [
            "C",
            "C++",
            "x86 assembly"
        ],
        "tools": [
            "nxdk",
            "LLVM/Clang",
            "XQEMU",
            "xemu"
        ],
        "scores": {
            "documentation": 82,
            "community": 76,
            "toolchain": 87,
            "debugLoop": 82,
            "abstraction": 83,
            "architecture": 79,
            "automation": 82,
            "assets": 77
        },
        "confidence": "high",
        "verdict": "Familiar x86/C++ concepts make it attractive, although the legal open stack is less complete than the proprietary XDK.",
        "advantage": "nxdk is active, cross-platform and can leverage broad x86/Direct3D-era knowledge.",
        "friction": "NV2A specifics, kernel/API gaps and emulator-debug workflows are less polished than PC development.",
        "sources": [
            {
                "label": "nxdk",
                "url": "https://github.com/XboxDev/nxdk"
            },
            {
                "label": "nxdk getting started",
                "url": "https://github.com/XboxDev/nxdk/wiki/getting-started"
            }
        ],
        "scopeNote": ""
    },
    {
        "id": "gba",
        "name": "Nintendo Game Boy Advance",
        "short": "GBA",
        "generation": 6,
        "kind": "handheld",
        "year": 2001,
        "region": "Global",
        "cpu": "ARM7TDMI + legacy audio CPU",
        "languages": [
            "C",
            "C++",
            "ARM assembly"
        ],
        "tools": [
            "devkitARM",
            "libgba",
            "Butano",
            "Tonc",
            "mGBA"
        ],
        "scores": {
            "documentation": 99,
            "community": 97,
            "toolchain": 97,
            "debugLoop": 99,
            "abstraction": 96,
            "architecture": 86,
            "automation": 98,
            "assets": 98
        },
        "confidence": "high",
        "verdict": "The best overall platform for AI-assisted native game development in this scope.",
        "advantage": "Modern ARM GCC, multiple high-level engines, definitive docs, source debugging and fast hardware-accurate emulation.",
        "friction": "DMA/timing, affine hardware and memory placement still need measurement, but the loop is exceptionally strong.",
        "sources": [
            {
                "label": "devkitPro getting started",
                "url": "https://devkitpro.org/wiki/Getting_Started/devkitARM"
            },
            {
                "label": "Tonc GBA programming guide",
                "url": "https://www.coranac.com/tonc/text/"
            },
            {
                "label": "Butano engine",
                "url": "https://github.com/GValiente/butano"
            }
        ],
        "scopeNote": ""
    },
    {
        "id": "pokemonmini",
        "name": "Pokémon mini",
        "short": "Pokémon mini",
        "generation": 6,
        "kind": "handheld",
        "year": 2001,
        "region": "Global",
        "cpu": "S1C88 custom 8-bit CPU",
        "languages": [
            "C",
            "Assembly"
        ],
        "tools": [
            "PMAS",
            "PokeMini emulator"
        ],
        "scores": {
            "documentation": 62,
            "community": 45,
            "toolchain": 58,
            "debugLoop": 72,
            "abstraction": 66,
            "architecture": 54,
            "automation": 56,
            "assets": 55
        },
        "confidence": "medium",
        "verdict": "A small but bounded target; workable with a known template and emulator, less so from scratch.",
        "advantage": "Simple display/game scope and an established emulator lower the task size.",
        "friction": "Obscure CPU, limited compiler maturity and small source corpus reduce agent correction.",
        "sources": [
            {
                "label": "Pokémon mini development wiki",
                "url": "https://www.pokemon-mini.net/development/"
            }
        ],
        "scopeNote": ""
    },
    {
        "id": "gp32",
        "name": "GamePark GP32",
        "short": "GP32",
        "generation": 6,
        "kind": "handheld",
        "year": 2001,
        "region": "Korea / Europe",
        "cpu": "ARM920T",
        "languages": [
            "C",
            "C++",
            "ARM assembly"
        ],
        "tools": [
            "devkitARM",
            "libmirko",
            "GeePee32"
        ],
        "scores": {
            "documentation": 74,
            "community": 57,
            "toolchain": 84,
            "debugLoop": 67,
            "abstraction": 78,
            "architecture": 81,
            "automation": 75,
            "assets": 72
        },
        "confidence": "medium",
        "verdict": "A familiar ARM C/C++ target with official devkitPro packaging, limited mainly by community size.",
        "advantage": "Standard GCC-style workflow and enough memory for conventional software architecture.",
        "friction": "Emulator accuracy, libraries and platform-specific examples are less mature than GBA/DS/PSP.",
        "sources": [
            {
                "label": "devkitPro getting started",
                "url": "https://devkitpro.org/wiki/Getting_Started/devkitARM"
            },
            {
                "label": "devkitPro GP32 support",
                "url": "https://devkitpro.org/wiki/Getting_Started"
            }
        ],
        "scopeNote": ""
    },
    {
        "id": "ngage",
        "name": "Nokia N-Gage",
        "short": "N-Gage",
        "generation": 6,
        "kind": "handheld",
        "year": 2003,
        "region": "Global",
        "cpu": "ARM9 + Symbian OS",
        "languages": [
            "C++",
            "Java ME"
        ],
        "tools": [
            "Symbian Series 60 SDK",
            "EKA2L1"
        ],
        "scores": {
            "documentation": 66,
            "community": 49,
            "toolchain": 56,
            "debugLoop": 62,
            "abstraction": 68,
            "architecture": 73,
            "automation": 56,
            "assets": 58
        },
        "confidence": "medium",
        "verdict": "High-level OS APIs help, but obsolete Symbian tooling and device packaging are major friction.",
        "advantage": "C++/Java concepts, filesystems and software rendering are familiar.",
        "friction": "SDK version matching, signing, emulator quirks and N-Gage-specific graphics/audio examples are fragmented.",
        "sources": [
            {
                "label": "EKA2L1 emulator",
                "url": "https://github.com/EKA2L1/EKA2L1"
            }
        ],
        "scopeNote": ""
    },
    {
        "id": "zodiac",
        "name": "Tapwave Zodiac",
        "short": "Zodiac",
        "generation": 6,
        "kind": "handheld",
        "year": 2003,
        "region": "North America",
        "cpu": "ARM9 + Palm OS 5",
        "languages": [
            "C",
            "C++"
        ],
        "tools": [
            "Palm OS SDK",
            "POSE",
            "Garnet emulators"
        ],
        "scores": {
            "documentation": 62,
            "community": 42,
            "toolchain": 59,
            "debugLoop": 55,
            "abstraction": 70,
            "architecture": 76,
            "automation": 57,
            "assets": 55
        },
        "confidence": "low",
        "verdict": "Conventional ARM/Palm programming is understandable, but the preserved game-specific stack is thin.",
        "advantage": "High-level OS APIs and familiar C/C++ reduce hardware-level complexity.",
        "friction": "Old host tools, sparse Zodiac acceleration docs and limited device/emulator validation.",
        "sources": [
            {
                "label": "Palm OS developer archive",
                "url": "https://palmdb.net/app/palm-os-sdk"
            }
        ],
        "scopeNote": ""
    },
    {
        "id": "vmu",
        "name": "Dreamcast VMU",
        "short": "VMU",
        "generation": 6,
        "kind": "companion",
        "year": 1998,
        "region": "Global",
        "cpu": "Sanyo LC8670 + monochrome LCD",
        "languages": [
            "C",
            "Assembly"
        ],
        "tools": [
            "KallistiOS VMU tools",
            "Dreamcast toolchains"
        ],
        "scores": {
            "documentation": 57,
            "community": 46,
            "toolchain": 55,
            "debugLoop": 61,
            "abstraction": 58,
            "architecture": 49,
            "automation": 52,
            "assets": 50
        },
        "confidence": "medium",
        "verdict": "Small games are practical, but toolchain and documentation depth trail mainstream handhelds.",
        "advantage": "Tight scope, simple visuals and Dreamcast integration examples.",
        "friction": "Obscure CPU, severe memory limits and fragmented standalone debugging.",
        "sources": [
            {
                "label": "KallistiOS",
                "url": "https://github.com/KallistiOS/KallistiOS"
            },
            {
                "label": "VMU development resources",
                "url": "https://mc.pp.se/dc/vms/"
            }
        ],
        "scopeNote": ""
    },
    {
        "id": "nds",
        "name": "Nintendo DS",
        "short": "Nintendo DS",
        "generation": 6,
        "kind": "handheld",
        "year": 2004,
        "region": "Global",
        "cpu": "ARM946E-S + ARM7TDMI",
        "languages": [
            "C",
            "C++",
            "ARM assembly"
        ],
        "tools": [
            "devkitARM",
            "libnds",
            "BlocksDS",
            "melonDS",
            "No$gba"
        ],
        "scores": {
            "documentation": 97,
            "community": 94,
            "toolchain": 96,
            "debugLoop": 97,
            "abstraction": 94,
            "architecture": 70,
            "automation": 95,
            "assets": 95
        },
        "confidence": "high",
        "verdict": "A premier AI-assisted target: mature C/C++, examples and emulators outweigh its dual-CPU complexity.",
        "advantage": "Modern packaged toolchains, high-level libraries, source code corpus and fast test cycle.",
        "friction": "VRAM banking, ARM7/ARM9 responsibilities, DMA/cache and 3D fixed-function details need explicit architecture.",
        "sources": [
            {
                "label": "devkitPro getting started",
                "url": "https://devkitpro.org/wiki/Getting_Started/devkitARM"
            },
            {
                "label": "BlocksDS SDK",
                "url": "https://blocksds.skylyrac.net/docs/"
            },
            {
                "label": "libnds",
                "url": "https://github.com/devkitPro/libnds"
            }
        ],
        "scopeNote": "DS is normally grouped with seventh-generation handhelds; included because the user explicitly requested it."
    },
    {
        "id": "psp",
        "name": "Sony PlayStation Portable",
        "short": "PSP",
        "generation": 6,
        "kind": "handheld",
        "year": 2004,
        "region": "Global",
        "cpu": "MIPS Allegrex + VFPU + Media Engine",
        "languages": [
            "C",
            "C++",
            "MIPS assembly"
        ],
        "tools": [
            "PSPDEV/PSPSDK",
            "CMake",
            "PPSSPP",
            "SDL2/SDL3 ports"
        ],
        "scores": {
            "documentation": 97,
            "community": 94,
            "toolchain": 98,
            "debugLoop": 96,
            "abstraction": 95,
            "architecture": 77,
            "automation": 97,
            "assets": 97
        },
        "confidence": "high",
        "verdict": "The strongest higher-powered handheld target: actively maintained SDK, modern packages and conventional C/C++ structure.",
        "advantage": "PSPDEV continues shipping releases, libraries and host-platform fixes; PPSSPP gives a fast loop.",
        "friction": "VFPU, cache coherency, GU state and Media Engine work still require platform-aware tests.",
        "sources": [
            {
                "label": "PSPSDK",
                "url": "https://github.com/pspdev/pspsdk"
            },
            {
                "label": "PSPDEV releases",
                "url": "https://github.com/pspdev/pspdev/releases"
            }
        ],
        "scopeNote": "PSP is normally grouped with seventh-generation handhelds; included because the user explicitly requested it."
    },
    {
        "id": "gizmondo",
        "name": "Tiger Telematics Gizmondo",
        "short": "Gizmondo",
        "generation": 6,
        "kind": "handheld",
        "year": 2005,
        "region": "Europe / North America",
        "cpu": "ARM9 + NVIDIA GoForce 3D",
        "languages": [
            "C",
            "C++"
        ],
        "tools": [
            "Windows CE SDK archives",
            "Community tools"
        ],
        "scores": {
            "documentation": 39,
            "community": 24,
            "toolchain": 35,
            "debugLoop": 39,
            "abstraction": 52,
            "architecture": 64,
            "automation": 36,
            "assets": 38
        },
        "confidence": "low",
        "verdict": "The hardware is comparatively conventional, but preserved public tooling is too weak for reliable autonomy.",
        "advantage": "ARM/Windows CE concepts and C++ are familiar.",
        "friction": "SDK access, driver APIs, emulator coverage and tiny community sharply limit testing.",
        "sources": [
            {
                "label": "Gizmondo development overview",
                "url": "https://www.retroreversing.com/gizmondo-development"
            }
        ],
        "scopeNote": "Included as a DS/PSP-era commercial handheld peer."
    },
    {
        "id": "gp2x",
        "name": "GamePark Holdings GP2X",
        "short": "GP2X",
        "generation": 6,
        "kind": "handheld",
        "year": 2005,
        "region": "Global enthusiast market",
        "cpu": "Dual ARM9 + embedded Linux",
        "languages": [
            "C",
            "C++",
            "SDL"
        ],
        "tools": [
            "Open2x",
            "GCC",
            "SDL",
            "QEMU/community emulators"
        ],
        "scores": {
            "documentation": 82,
            "community": 72,
            "toolchain": 86,
            "debugLoop": 70,
            "abstraction": 91,
            "architecture": 68,
            "automation": 83,
            "assets": 84
        },
        "confidence": "high",
        "verdict": "Linux, GCC and SDL make this one of the easiest niche handhelds for AI-generated code.",
        "advantage": "Conventional userspace programming, open toolchains and many ports reduce platform-specific surface area.",
        "friction": "Dual-core quirks, firmware differences and weaker hardware-accurate debugging than emulated consoles.",
        "sources": [
            {
                "label": "Open2x toolchain",
                "url": "https://github.com/open2x/open2x"
            }
        ],
        "scopeNote": "Included as a DS/PSP-era open handheld peer."
    }
];
const scoreLabels = { documentation: 'Documentation', community: 'Community & examples', toolchain: 'Toolchain reproducibility', debugLoop: 'Build / debug loop', abstraction: 'High-level libraries', architecture: 'Architecture simplicity', automation: 'Agent / editor fit', assets: 'Asset & audio pipeline' };
const defaultWeights = { documentation: 16, community: 12, toolchain: 18, debugLoop: 14, abstraction: 12, architecture: 12, automation: 10, assets: 6 };
if (!React.Fragment)
    React.Fragment = ({ children }) => children;
let hookStates = [];
let hookCursor = 0;
let renderPending = false;
function scheduleRender() {
    if (renderPending)
        return;
    renderPending = true;
    Promise.resolve().then(() => { renderPending = false; renderApp(); });
}
function useState(initial) {
    const index = hookCursor++;
    if (!(index in hookStates))
        hookStates[index] = typeof initial === 'function' ? initial() : initial;
    const setter = (value) => {
        const next = typeof value === 'function' ? value(hookStates[index]) : value;
        if (Object.is(next, hookStates[index]))
            return;
        hookStates[index] = next;
        scheduleRender();
    };
    return [hookStates[index], setter];
}
function useMemo(factory, _deps) { return factory(); }
const SCORE_KEYS = ['documentation', 'community', 'toolchain', 'debugLoop', 'abstraction', 'architecture', 'automation', 'assets'];
const GEN_COLORS = { 3: '#82b1ff', 4: '#b388ff', 5: '#ffab91', 6: '#80cbc4' };
const TIER_META = [
    { min: 85, label: 'Agent-ready', note: 'A capable coding agent can own substantial vertical slices with disciplined tests.', color: '#7ce7d5' },
    { min: 70, label: 'Assisted', note: 'Good target for AI pair-programming; humans still need platform-specific review.', color: '#9bbcff' },
    { min: 55, label: 'Supervised', note: 'Automation helps with scaffolding, but frequent expert correction is expected.', color: '#ffd180' },
    { min: 0, label: 'Research-heavy', note: 'Sparse evidence, unusual hardware, or poor feedback loops limit reliable autonomy.', color: '#ff8fa3' }
];
function tierFor(score) { return TIER_META.find(t => score >= t.min) || TIER_META[TIER_META.length - 1]; }
function scorePlatform(platform, weights) {
    const total = SCORE_KEYS.reduce((sum, key) => sum + weights[key], 0) || 1;
    return Math.round(SCORE_KEYS.reduce((sum, key) => sum + platform.scores[key] * weights[key], 0) / total);
}
function clamp(v, min, max) { return Math.max(min, Math.min(max, v)); }
function pct(v) { return `${clamp(v, 0, 100)}%`; }
function confidenceLabel(v) { return v[0].toUpperCase() + v.slice(1); }
function kindLabel(v) { return v === 'add-on' ? 'Add-on' : v === 'companion' ? 'Companion' : v[0].toUpperCase() + v.slice(1); }
function Icon({ name, size = 20 }) {
    const common = { width: size, height: size, viewBox: '0 0 24 24', 'aria-hidden': 'true', focusable: 'false' };
    const paths = {
        gamepad: React.createElement(React.Fragment, null,
            React.createElement("path", { d: "M7.6 8h8.8a5.6 5.6 0 0 1 5.3 7.4l-1.2 3.5a2.7 2.7 0 0 1-4.5 1l-2-2H10l-2 2a2.7 2.7 0 0 1-4.5-1l-1.2-3.5A5.6 5.6 0 0 1 7.6 8Z" }),
            React.createElement("path", { d: "M7 12v4M5 14h4M16.5 13.2h.01M19 15.5h.01" })),
        search: React.createElement(React.Fragment, null,
            React.createElement("circle", { cx: "11", cy: "11", r: "7" }),
            React.createElement("path", { d: "m20 20-4-4" })),
        tune: React.createElement(React.Fragment, null,
            React.createElement("path", { d: "M4 7h10M18 7h2M4 17h2M10 17h10M14 4v6M10 14v6" })),
        compare: React.createElement(React.Fragment, null,
            React.createElement("path", { d: "M8 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h3M16 3h3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-3M12 5v14M9 8l3-3 3 3M9 16l3 3 3-3" })),
        info: React.createElement(React.Fragment, null,
            React.createElement("circle", { cx: "12", cy: "12", r: "9" }),
            React.createElement("path", { d: "M12 10v6M12 7h.01" })),
        close: React.createElement(React.Fragment, null,
            React.createElement("path", { d: "m6 6 12 12M18 6 6 18" })),
        link: React.createElement(React.Fragment, null,
            React.createElement("path", { d: "M10 13a5 5 0 0 0 7.1.1l2-2a5 5 0 0 0-7.1-7.1l-1.1 1.1M14 11a5 5 0 0 0-7.1-.1l-2 2A5 5 0 0 0 12 20l1.1-1.1" })),
        reset: React.createElement(React.Fragment, null,
            React.createElement("path", { d: "M4 12a8 8 0 1 0 2.3-5.7L4 8.6M4 4v4.6h4.6" })),
        check: React.createElement(React.Fragment, null,
            React.createElement("path", { d: "m5 12 4 4L19 6" })),
        warning: React.createElement(React.Fragment, null,
            React.createElement("path", { d: "M12 3 2.8 20h18.4L12 3Z" }),
            React.createElement("path", { d: "M12 9v4M12 17h.01" })),
        chevron: React.createElement("path", { d: "m9 18 6-6-6-6" }),
        bars: React.createElement(React.Fragment, null,
            React.createElement("path", { d: "M4 20V10M10 20V4M16 20v-7M22 20H2" })),
        spark: React.createElement(React.Fragment, null,
            React.createElement("path", { d: "m13 2-2 7H4l6 4-2 9 9-12h-6l2-8Z" })),
        github: React.createElement(React.Fragment, null,
            React.createElement("path", { d: "M15 22v-4a4.8 4.8 0 0 0-1-3.5c3.3-.4 6.8-1.6 6.8-7.4A5.8 5.8 0 0 0 19.3 3 5.4 5.4 0 0 0 19.1 0S17.9-.4 15 1.5a13.4 13.4 0 0 0-6 0C6.1-.4 4.9 0 4.9 0a5.4 5.4 0 0 0-.2 3A5.8 5.8 0 0 0 3.2 7.1c0 5.8 3.5 7 6.8 7.4A4.8 4.8 0 0 0 9 18v4" }))
    };
    return React.createElement("svg", { ...common, fill: "none", stroke: "currentColor", strokeWidth: "1.8", strokeLinecap: "round", strokeLinejoin: "round" }, paths[name] || paths.info);
}
function ScoreDial({ score, size = 'md' }) {
    const tier = tierFor(score), radius = size === 'lg' ? 42 : size === 'sm' ? 22 : 30, dim = radius * 2 + 12, circumference = 2 * Math.PI * radius;
    return React.createElement("div", { className: `score-dial score-dial-${size}`, style: { width: dim, height: dim, color: tier.color }, "aria-label": `Score ${score} out of 100` },
        React.createElement("svg", { width: dim, height: dim, viewBox: `0 0 ${dim} ${dim}` },
            React.createElement("circle", { className: "dial-track", cx: dim / 2, cy: dim / 2, r: radius }),
            React.createElement("circle", { className: "dial-progress", cx: dim / 2, cy: dim / 2, r: radius, strokeDasharray: circumference, strokeDashoffset: circumference * (1 - score / 100) })),
        React.createElement("span", null, score));
}
function SubscoreBars({ platform, compact = false }) {
    return React.createElement("div", { className: compact ? 'subscores compact' : 'subscores' }, SCORE_KEYS.map(key => React.createElement("div", { className: "subscore", key: key },
        React.createElement("div", { className: "subscore-label" },
            React.createElement("span", null, compact ? scoreLabels[key].split(' ')[0] : scoreLabels[key]),
            React.createElement("b", null, platform.scores[key])),
        React.createElement("div", { className: "bar-track" },
            React.createElement("span", { style: { width: pct(platform.scores[key]) } })))));
}
function TopBarChart({ items, onSelect }) {
    const top = items.slice(0, 15), max = Math.max(...top.map(x => x.score), 100);
    return React.createElement("div", { className: "rank-chart", role: "img", "aria-label": "Top fifteen systems by automation score" }, top.map((item, index) => React.createElement("button", { className: "rank-row", key: item.platform.id, onClick: () => onSelect(item.platform) },
        React.createElement("span", { className: "rank-number" }, index + 1),
        React.createElement("span", { className: "rank-name" }, item.platform.short),
        React.createElement("span", { className: "rank-track" },
            React.createElement("span", { style: { width: `${item.score / max * 100}%`, background: GEN_COLORS[item.platform.generation] } })),
        React.createElement("b", null, item.score))));
}
function ScatterPlot({ items, onSelect }) {
    const width = 720, height = 420, pad = { l: 54, r: 24, t: 28, b: 52 };
    const x = (v) => pad.l + (v - 20) / 80 * (width - pad.l - pad.r);
    const y = (v) => height - pad.b - (v - 20) / 80 * (height - pad.t - pad.b);
    const points = items.filter(i => i.platform.scores.documentation >= 20 && i.platform.scores.architecture >= 20);
    return React.createElement("div", { className: "scatter-wrap" },
        React.createElement("svg", { className: "scatter", viewBox: `0 0 ${width} ${height}`, role: "img", "aria-label": "Documentation and community strength compared with architecture simplicity" },
            [20, 40, 60, 80, 100].map(v => React.createElement("g", { key: v },
                React.createElement("line", { x1: x(v), y1: pad.t, x2: x(v), y2: height - pad.b, className: "gridline" }),
                React.createElement("text", { x: x(v), y: height - 22, textAnchor: "middle" }, v))),
            [20, 40, 60, 80, 100].map(v => React.createElement("g", { key: v },
                React.createElement("line", { x1: pad.l, y1: y(v), x2: width - pad.r, y2: y(v), className: "gridline" }),
                React.createElement("text", { x: 30, y: y(v) + 4, textAnchor: "middle" }, v))),
            React.createElement("text", { x: width / 2, y: height - 3, textAnchor: "middle", className: "axis-title" }, "Docs + community"),
            React.createElement("text", { transform: `translate(13 ${height / 2}) rotate(-90)`, textAnchor: "middle", className: "axis-title" }, "Architecture simplicity"),
            points.map(({ platform, score }) => {
                const knowledge = (platform.scores.documentation + platform.scores.community) / 2;
                return React.createElement("g", { className: "scatter-point", key: platform.id, transform: `translate(${x(knowledge)} ${y(platform.scores.architecture)})`, onClick: () => onSelect(platform), tabIndex: 0, role: "button", "aria-label": `${platform.name}: score ${score}` },
                    React.createElement("circle", { r: 4 + score / 24, fill: GEN_COLORS[platform.generation], opacity: .76 }),
                    React.createElement("title", null,
                        platform.name,
                        " \u2014 ",
                        score));
            })));
}
function radarPoints(platform, cx, cy, r) {
    return SCORE_KEYS.map((key, i) => { const a = -Math.PI / 2 + i * 2 * Math.PI / SCORE_KEYS.length; const rr = r * platform.scores[key] / 100; return `${cx + Math.cos(a) * rr},${cy + Math.sin(a) * rr}`; }).join(' ');
}
function RadarChart({ selected }) {
    const size = 460, c = size / 2, r = 165;
    const palette = ['#bb86fc', '#03dac6', '#ffb74d'];
    return React.createElement("div", { className: "radar-wrap" },
        React.createElement("svg", { viewBox: `0 0 ${size} ${size}`, className: "radar", role: "img", "aria-label": "Eight-dimension comparison radar chart" },
            [.25, .5, .75, 1].map(level => React.createElement("polygon", { key: level, className: "radar-grid", points: SCORE_KEYS.map((_, i) => { const a = -Math.PI / 2 + i * 2 * Math.PI / 8; return `${c + Math.cos(a) * r * level},${c + Math.sin(a) * r * level}`; }).join(' ') })),
            SCORE_KEYS.map((key, i) => { const a = -Math.PI / 2 + i * 2 * Math.PI / 8, ex = c + Math.cos(a) * r, ey = c + Math.sin(a) * r; return React.createElement("g", { key: key },
                React.createElement("line", { x1: c, y1: c, x2: ex, y2: ey, className: "radar-grid" }),
                React.createElement("text", { x: c + Math.cos(a) * (r + 34), y: c + Math.sin(a) * (r + 34), textAnchor: "middle", dominantBaseline: "middle" }, scoreLabels[key].replace(' & examples', '').replace(' reproducibility', '').replace('High-level ', ''))); }),
            selected.map((p, i) => React.createElement("polygon", { key: p.id, points: radarPoints(p, c, c, r), fill: palette[i], stroke: palette[i], fillOpacity: ".12", strokeWidth: "3" }))),
        React.createElement("div", { className: "radar-legend" }, selected.map((p, i) => React.createElement("span", { key: p.id },
            React.createElement("i", { style: { background: palette[i] } }),
            p.short))));
}
function PlatformCard({ platform, score, onOpen, onCompare, isCompared }) {
    const tier = tierFor(score);
    return React.createElement("article", { className: "platform-card" },
        React.createElement("button", { className: "card-main", onClick: () => onOpen(platform) },
            React.createElement("div", { className: "card-heading" },
                React.createElement(ScoreDial, { score: score }),
                React.createElement("div", null,
                    React.createElement("div", { className: "meta-line" },
                        React.createElement("span", { style: { color: GEN_COLORS[platform.generation] } },
                            "GEN ",
                            platform.generation),
                        React.createElement("span", null, kindLabel(platform.kind)),
                        React.createElement("span", null, platform.year)),
                    React.createElement("h3", null, platform.name),
                    React.createElement("p", null, platform.verdict))),
            React.createElement("div", { className: "tool-row" }, platform.tools.slice(0, 4).map(t => React.createElement("span", { key: t }, t))),
            React.createElement("div", { className: "card-footer" },
                React.createElement("span", { className: "tier-tag", style: { color: tier.color, borderColor: tier.color } }, tier.label),
                React.createElement("span", { className: `confidence ${platform.confidence}` },
                    confidenceLabel(platform.confidence),
                    " confidence"),
                React.createElement("span", { className: "open-label" },
                    "Details ",
                    React.createElement(Icon, { name: "chevron", size: 15 })))),
        React.createElement("button", { className: `compare-toggle ${isCompared ? 'selected' : ''}`, onClick: () => onCompare(platform), "aria-pressed": isCompared },
            React.createElement(Icon, { name: isCompared ? 'check' : 'compare', size: 17 }),
            isCompared ? 'Selected' : 'Compare'));
}
function DetailModal({ platform, score, onClose, onCompare, isCompared }) {
    const tier = tierFor(score);
    return React.createElement("div", { className: "modal-backdrop", onMouseDown: (e) => { if (e.target === e.currentTarget)
            onClose(); } },
        React.createElement("section", { className: "detail-sheet", role: "dialog", "aria-modal": "true", "aria-labelledby": "detail-title" },
            React.createElement("header", { className: "detail-header" },
                React.createElement("div", null,
                    React.createElement("div", { className: "meta-line" },
                        React.createElement("span", { style: { color: GEN_COLORS[platform.generation] } },
                            "GEN ",
                            platform.generation),
                        React.createElement("span", null, kindLabel(platform.kind)),
                        React.createElement("span", null, platform.year),
                        React.createElement("span", null, platform.region)),
                    React.createElement("h2", { id: "detail-title" }, platform.name)),
                React.createElement("button", { className: "icon-button", onClick: onClose, "aria-label": "Close" },
                    React.createElement(Icon, { name: "close" }))),
            React.createElement("div", { className: "detail-score" },
                React.createElement(ScoreDial, { score: score, size: "lg" }),
                React.createElement("div", null,
                    React.createElement("span", { className: "tier-kicker", style: { color: tier.color } }, tier.label),
                    React.createElement("p", null, platform.verdict),
                    React.createElement("small", null, tier.note))),
            React.createElement("div", { className: "detail-facts" },
                React.createElement("div", null,
                    React.createElement("span", null, "Processor"),
                    React.createElement("b", null, platform.cpu)),
                React.createElement("div", null,
                    React.createElement("span", null, "Languages"),
                    React.createElement("b", null, platform.languages.join(' · '))),
                React.createElement("div", null,
                    React.createElement("span", null, "Primary tools"),
                    React.createElement("b", null, platform.tools.join(' · '))),
                React.createElement("div", null,
                    React.createElement("span", null, "Evidence confidence"),
                    React.createElement("b", null, confidenceLabel(platform.confidence)))),
            React.createElement("section", null,
                React.createElement("h3", null, "Score anatomy"),
                React.createElement(SubscoreBars, { platform: platform })),
            React.createElement("div", { className: "analysis-pair" },
                React.createElement("article", { className: "positive" },
                    React.createElement("h3", null,
                        React.createElement(Icon, { name: "check" }),
                        "Automation advantage"),
                    React.createElement("p", null, platform.advantage)),
                React.createElement("article", { className: "negative" },
                    React.createElement("h3", null,
                        React.createElement(Icon, { name: "warning" }),
                        "Human-review friction"),
                    React.createElement("p", null, platform.friction))),
            platform.scopeNote && React.createElement("div", { className: "scope-note" },
                React.createElement(Icon, { name: "info" }),
                React.createElement("p", null, platform.scopeNote)),
            React.createElement("section", null,
                React.createElement("h3", null, "Evidence starting points"),
                React.createElement("div", { className: "source-list" }, platform.sources.map(s => React.createElement("a", { href: s.url, target: "_blank", rel: "noreferrer", key: s.url },
                    React.createElement(Icon, { name: "link", size: 16 }),
                    React.createElement("span", null, s.label))))),
            React.createElement("footer", { className: "detail-actions" },
                React.createElement("button", { className: `button ${isCompared ? 'tonal' : ''}`, onClick: () => onCompare(platform) },
                    React.createElement(Icon, { name: isCompared ? 'check' : 'compare' }),
                    isCompared ? 'Remove from comparison' : 'Add to comparison'),
                React.createElement("button", { className: "button ghost", onClick: onClose }, "Close"))));
}
function WeightControls({ weights, setWeights }) {
    const total = SCORE_KEYS.reduce((s, k) => s + weights[k], 0);
    return React.createElement("div", { className: "weight-panel" },
        React.createElement("div", { className: "weight-head" },
            React.createElement("div", null,
                React.createElement("h3", null, "Scoring weights"),
                React.createElement("p", null, "Adjust what \u201Ceasy to automate\u201D means. Rankings update immediately.")),
            React.createElement("button", { className: "text-button", onClick: () => setWeights({ ...defaultWeights }) },
                React.createElement(Icon, { name: "reset", size: 16 }),
                "Reset")),
        React.createElement("div", { className: "weight-grid" }, SCORE_KEYS.map(key => React.createElement("label", { key: key },
            React.createElement("span", null,
                scoreLabels[key],
                " ",
                React.createElement("b", null, weights[key])),
            React.createElement("input", { type: "range", min: "0", max: "30", step: "1", value: weights[key], onChange: (e) => setWeights({ ...weights, [key]: Number(e.target.value) }) })))),
        React.createElement("small", null,
            "Current weight total: ",
            total,
            ". Scores are normalized, so weights do not need to sum to 100."));
}
function App() {
    const readParams = () => new URLSearchParams(location.search);
    const params = readParams();
    const [tab, setTab] = useState(params.get('tab') || 'overview');
    const [query, setQuery] = useState(params.get('q') || '');
    const [gen, setGen] = useState(params.get('gen') || 'all');
    const [kind, setKind] = useState(params.get('kind') || 'all');
    const [confidence, setConfidence] = useState(params.get('confidence') || 'all');
    const [sort, setSort] = useState(params.get('sort') || 'score-desc');
    const [selected, setSelected] = useState([]);
    const [detail, setDetail] = useState(null);
    const [weights, setWeightsState] = useState(() => {
        try {
            return { ...defaultWeights, ...JSON.parse(localStorage.getItem('retro-ai-weights') || '{}') };
        }
        catch {
            return { ...defaultWeights };
        }
    });
    const setWeights = (w) => { setWeightsState(w); localStorage.setItem('retro-ai-weights', JSON.stringify(w)); };
    const scored = useMemo(() => platforms.map(platform => ({ platform, score: scorePlatform(platform, weights) })), [weights]);
    const filtered = useMemo(() => scored.filter(({ platform }) => {
        const q = query.trim().toLowerCase();
        const matchesQ = !q || [platform.name, platform.short, platform.cpu, platform.verdict, ...platform.tools, ...platform.languages].join(' ').toLowerCase().includes(q);
        return matchesQ && (gen === 'all' || String(platform.generation) === gen) && (kind === 'all' || platform.kind === kind) && (confidence === 'all' || platform.confidence === confidence);
    }).sort((a, b) => sort === 'score-desc' ? b.score - a.score : sort === 'score-asc' ? a.score - b.score : sort === 'year-asc' ? a.platform.year - b.platform.year : sort === 'year-desc' ? b.platform.year - a.platform.year : a.platform.name.localeCompare(b.platform.name)), [scored, query, gen, kind, confidence, sort]);
    const selectedPlatforms = selected.map(id => platforms.find(p => p.id === id)).filter(Boolean);
    const scoreById = (id) => { var _a; return ((_a = scored.find(x => x.platform.id === id)) === null || _a === void 0 ? void 0 : _a.score) || 0; };
    const toggleCompare = (p) => setSelected(prev => prev.includes(p.id) ? prev.filter(id => id !== p.id) : prev.length >= 3 ? [prev[1], prev[2], p.id] : [...prev, p.id]);
    const urlState = new URLSearchParams();
    if (tab !== 'overview')
        urlState.set('tab', tab);
    if (query)
        urlState.set('q', query);
    if (gen !== 'all')
        urlState.set('gen', gen);
    if (kind !== 'all')
        urlState.set('kind', kind);
    if (confidence !== 'all')
        urlState.set('confidence', confidence);
    if (sort !== 'score-desc')
        urlState.set('sort', sort);
    try {
        history.replaceState(null, '', `${location.pathname}${urlState.toString() ? `?${urlState}` : ''}`);
    }
    catch { }
    document.onkeydown = detail ? ((event) => { if (event.key === 'Escape')
        setDetail(null); }) : null;
    const averages = [3, 4, 5, 6].map(g => { const group = scored.filter(x => x.platform.generation === g); return { g, avg: Math.round(group.reduce((s, x) => s + x.score, 0) / group.length), count: group.length }; });
    const highConfidence = scored.filter(x => x.platform.confidence === 'high');
    const best = ([...highConfidence].sort((a, b) => b.score - a.score)[0] || scored[0]);
    const lowest = ([...scored].sort((a, b) => a.score - b.score)[0]);
    return React.createElement("div", { className: "app-shell" },
        React.createElement("header", { className: "topbar" },
            React.createElement("div", { className: "topbar-inner" },
                React.createElement("a", { className: "brand", href: "#", onClick: (e) => { e.preventDefault(); setTab('overview'); } },
                    React.createElement("span", { className: "brand-mark" },
                        React.createElement(Icon, { name: "gamepad" })),
                    React.createElement("span", null,
                        React.createElement("b", null, "Retro AI-Dev Index"),
                        React.createElement("small", null, "How automatable is game development on classic hardware?"))),
                React.createElement("div", { className: "topbar-meta" },
                    React.createElement("span", null,
                        platforms.length,
                        " platforms"),
                    React.createElement("span", null, "Research snapshot \u00B7 July 2026")))),
        React.createElement("nav", { className: "tabs", "aria-label": "Primary" },
            React.createElement("div", { className: "tabs-inner" }, [['overview', 'Overview', 'bars'], ['explorer', 'Platform explorer', 'search'], ['compare', `Compare${selected.length ? ` (${selected.length})` : ''}`, 'compare'], ['methodology', 'Methodology', 'info']].map(([id, label, icon]) => React.createElement("button", { key: id, className: tab === id ? 'active' : '', onClick: () => setTab(id) },
                React.createElement(Icon, { name: icon, size: 18 }),
                React.createElement("span", null, label))))),
        React.createElement("main", null,
            tab === 'overview' && React.createElement(React.Fragment, null,
                React.createElement("section", { className: "hero" },
                    React.createElement("div", { className: "hero-copy" },
                        React.createElement("h1", null, "Not all retro platforms are equally legible to an AI coding agent."),
                        React.createElement("p", null, "This index scores the complete practical field from the NES/Famicom/FDS era through sixth-generation systems, plus Nintendo DS and PSP. It measures not just raw hardware difficulty, but whether an agent can find trustworthy examples, build reproducibly, inspect failures, and recover without inventing APIs."),
                        React.createElement("div", { className: "hero-actions" },
                            React.createElement("button", { className: "button primary", onClick: () => setTab('explorer') },
                                React.createElement(Icon, { name: "search" }),
                                "Explore all platforms"),
                            React.createElement("button", { className: "button tonal", onClick: () => setTab('methodology') },
                                React.createElement(Icon, { name: "tune" }),
                                "Adjust the model"))),
                    React.createElement("div", { className: "hero-score" },
                        React.createElement("div", { className: "hero-orbit" },
                            React.createElement(ScoreDial, { score: best.score, size: "lg" }),
                            React.createElement("span", { className: "orbit-note" }, "Highest high-confidence score")),
                        React.createElement("div", null,
                            React.createElement("span", { className: "eyebrow" }, "Leading target"),
                            React.createElement("h2", null, best.platform.name),
                            React.createElement("p", null, best.platform.verdict)))),
                React.createElement("section", { className: "metric-strip" },
                    React.createElement("article", null,
                        React.createElement("span", null, "Platforms evaluated"),
                        React.createElement("b", null, platforms.length),
                        React.createElement("small", null, "Consoles, handhelds, add-ons and companions")),
                    React.createElement("article", null,
                        React.createElement("span", null, "High-confidence profiles"),
                        React.createElement("b", null, highConfidence.length),
                        React.createElement("small", null, "Multiple strong public evidence paths")),
                    React.createElement("article", null,
                        React.createElement("span", null, "Scoring dimensions"),
                        React.createElement("b", null, SCORE_KEYS.length),
                        React.createElement("small", null, "Weighted and user-adjustable")),
                    React.createElement("article", null,
                        React.createElement("span", null, "Hardest current target"),
                        React.createElement("b", null, lowest.platform.short),
                        React.createElement("small", null,
                            lowest.score,
                            "/100 \u00B7 ",
                            confidenceLabel(lowest.platform.confidence),
                            " confidence"))),
                React.createElement("section", { className: "content-section two-col" },
                    React.createElement("div", { className: "panel" },
                        React.createElement("div", { className: "section-heading" },
                            React.createElement("div", null,
                                React.createElement("span", { className: "eyebrow" }, "Ranking"),
                                React.createElement("h2", null, "The easiest platforms for AI-assisted development"),
                                React.createElement("p", null, "Scores below use the current weights and prioritize a repeatable build\u2013test\u2013debug loop.")),
                            React.createElement("button", { className: "text-button", onClick: () => setTab('explorer') },
                                "Full ranking ",
                                React.createElement(Icon, { name: "chevron", size: 16 }))),
                        React.createElement(TopBarChart, { items: [...scored].sort((a, b) => b.score - a.score), onSelect: setDetail })),
                    React.createElement("div", { className: "panel generation-panel" },
                        React.createElement("div", { className: "section-heading" },
                            React.createElement("div", null,
                                React.createElement("span", { className: "eyebrow" }, "Generational view"),
                                React.createElement("h2", null, "Newer is easier\u2014until architecture fights back"),
                                React.createElement("p", null, "Sixth-generation systems benefit from C/C++ and stronger SDKs, but specialized multiprocessor hardware can erase that advantage."))),
                        React.createElement("div", { className: "generation-bars" }, averages.map(a => React.createElement("div", { key: a.g },
                            React.createElement("div", null,
                                React.createElement("span", null,
                                    "Generation ",
                                    a.g),
                                React.createElement("b", null, a.avg)),
                            React.createElement("div", { className: "gen-track" },
                                React.createElement("span", { style: { width: pct(a.avg), background: GEN_COLORS[a.g] } })),
                            React.createElement("small", null,
                                a.count,
                                " platforms")))),
                        React.createElement("div", { className: "insight-callout" },
                            React.createElement(Icon, { name: "spark" }),
                            React.createElement("p", null,
                                React.createElement("b", null, "The practical sweet spot:"),
                                " mature 2D C ecosystems such as GBA, Game Boy, Genesis and NES often outperform more powerful machines because agents can verify their work faster.")))),
                React.createElement("section", { className: "content-section" },
                    React.createElement("div", { className: "panel" },
                        React.createElement("div", { className: "section-heading" },
                            React.createElement("div", null,
                                React.createElement("span", { className: "eyebrow" }, "Knowledge versus hardware"),
                                React.createElement("h2", null, "Documentation can compensate for strange architecture\u2014but only so far"),
                                React.createElement("p", null, "Upper-right systems combine broad public knowledge with relatively simple hardware. Bubble size reflects the overall score."))),
                        React.createElement(ScatterPlot, { items: scored, onSelect: setDetail }),
                        React.createElement("div", { className: "legend-row" }, [3, 4, 5, 6].map(g => React.createElement("span", { key: g },
                            React.createElement("i", { style: { background: GEN_COLORS[g] } }),
                            "Gen ",
                            g))))),
                React.createElement("section", { className: "content-section" },
                    React.createElement("div", { className: "section-heading standalone" },
                        React.createElement("div", null,
                            React.createElement("span", { className: "eyebrow" }, "Recommended starting set"),
                            React.createElement("h2", null, "Four targets that teach different agent-development lessons"),
                            React.createElement("p", null, "These are not simply the top four scores; they cover distinct levels of abstraction and hardware exposure."))),
                    React.createElement("div", { className: "featured-grid" }, ['gba', 'gameboy', 'genesis', 'dreamcast'].map(id => { const item = scored.find(x => x.platform.id === id); return React.createElement(PlatformCard, { key: id, platform: item.platform, score: item.score, onOpen: setDetail, onCompare: toggleCompare, isCompared: selected.includes(id) }); })))),
            tab === 'explorer' && React.createElement("section", { className: "content-section explorer-section" },
                React.createElement("div", { className: "page-title" },
                    React.createElement("span", { className: "eyebrow" }, "All evidence profiles"),
                    React.createElement("h1", null, "Platform explorer"),
                    React.createElement("p", null, "Search by platform, CPU, language, SDK or emulator. Open any card for source links and score anatomy.")),
                React.createElement("div", { className: "filter-bar" },
                    React.createElement("label", { className: "search-field" },
                        React.createElement(Icon, { name: "search" }),
                        React.createElement("input", { value: query, onChange: (e) => setQuery(e.target.value), placeholder: "Search platforms, tools, CPUs\u2026" }),
                        React.createElement("button", { onClick: () => setQuery(''), "aria-label": "Clear search", className: query ? 'visible' : '' },
                            React.createElement(Icon, { name: "close", size: 16 }))),
                    React.createElement("select", { value: gen, onChange: (e) => setGen(e.target.value) },
                        React.createElement("option", { value: "all" }, "All generations"),
                        React.createElement("option", { value: "3" }, "Generation 3"),
                        React.createElement("option", { value: "4" }, "Generation 4"),
                        React.createElement("option", { value: "5" }, "Generation 5"),
                        React.createElement("option", { value: "6" }, "Generation 6 + DS/PSP era")),
                    React.createElement("select", { value: kind, onChange: (e) => setKind(e.target.value) },
                        React.createElement("option", { value: "all" }, "All platform types"),
                        React.createElement("option", { value: "console" }, "Home consoles"),
                        React.createElement("option", { value: "handheld" }, "Handhelds"),
                        React.createElement("option", { value: "add-on" }, "Add-ons"),
                        React.createElement("option", { value: "companion" }, "Companions")),
                    React.createElement("select", { value: confidence, onChange: (e) => setConfidence(e.target.value) },
                        React.createElement("option", { value: "all" }, "All confidence levels"),
                        React.createElement("option", { value: "high" }, "High confidence"),
                        React.createElement("option", { value: "medium" }, "Medium confidence"),
                        React.createElement("option", { value: "low" }, "Low confidence")),
                    React.createElement("select", { value: sort, onChange: (e) => setSort(e.target.value) },
                        React.createElement("option", { value: "score-desc" }, "Score: high to low"),
                        React.createElement("option", { value: "score-asc" }, "Score: low to high"),
                        React.createElement("option", { value: "year-asc" }, "Release: oldest first"),
                        React.createElement("option", { value: "year-desc" }, "Release: newest first"),
                        React.createElement("option", { value: "name" }, "Name"))),
                React.createElement("div", { className: "results-line" },
                    React.createElement("b", null, filtered.length),
                    " of ",
                    platforms.length,
                    " platforms",
                    React.createElement("span", null,
                        selected.length,
                        "/3 selected for comparison")),
                filtered.length ? React.createElement("div", { className: "platform-grid" }, filtered.map(({ platform, score }) => React.createElement(PlatformCard, { key: platform.id, platform: platform, score: score, onOpen: setDetail, onCompare: toggleCompare, isCompared: selected.includes(platform.id) }))) : React.createElement("div", { className: "empty-state" },
                    React.createElement(Icon, { name: "search", size: 42 }),
                    React.createElement("h2", null, "No platforms match"),
                    React.createElement("p", null, "Try a broader search or reset the filters."),
                    React.createElement("button", { className: "button tonal", onClick: () => { setQuery(''); setGen('all'); setKind('all'); setConfidence('all'); } }, "Reset filters"))),
            tab === 'compare' && React.createElement("section", { className: "content-section compare-section" },
                React.createElement("div", { className: "page-title" },
                    React.createElement("span", { className: "eyebrow" }, "Side-by-side analysis"),
                    React.createElement("h1", null, "Compare up to three platforms"),
                    React.createElement("p", null, "Radar geometry uses raw dimension scores; headline scores use your active weights.")),
                React.createElement("div", { className: "compare-picker" }, [0, 1, 2].map(index => React.createElement("label", { key: index },
                    React.createElement("span", null,
                        "Platform ",
                        index + 1),
                    React.createElement("select", { value: selected[index] || '', onChange: (e) => { const id = e.target.value; setSelected(prev => { const next = [...prev]; if (id)
                            next[index] = id;
                        else
                            next.splice(index, 1); return Array.from(new Set(next.filter(Boolean))).slice(0, 3); }); } },
                        React.createElement("option", { value: "" }, "Choose a platform"),
                        [...platforms].sort((a, b) => a.name.localeCompare(b.name)).map(p => React.createElement("option", { value: p.id, key: p.id, disabled: selected.includes(p.id) && selected[index] !== p.id }, p.name)))))),
                selectedPlatforms.length ? React.createElement(React.Fragment, null,
                    React.createElement("div", { className: "comparison-hero" },
                        React.createElement(RadarChart, { selected: selectedPlatforms }),
                        React.createElement("div", { className: "comparison-summaries" }, selectedPlatforms.map(p => { const s = scoreById(p.id), t = tierFor(s); return React.createElement("article", { key: p.id },
                            React.createElement(ScoreDial, { score: s }),
                            React.createElement("div", null,
                                React.createElement("span", { style: { color: t.color } }, t.label),
                                React.createElement("h3", null, p.name),
                                React.createElement("p", null, p.verdict))); }))),
                    React.createElement("div", { className: "comparison-table-wrap" },
                        React.createElement("table", { className: "comparison-table" },
                            React.createElement("thead", null,
                                React.createElement("tr", null,
                                    React.createElement("th", null, "Dimension"),
                                    selectedPlatforms.map(p => React.createElement("th", { key: p.id }, p.short)))),
                            React.createElement("tbody", null,
                                SCORE_KEYS.map(key => React.createElement("tr", { key: key },
                                    React.createElement("th", null, scoreLabels[key]),
                                    selectedPlatforms.map(p => React.createElement("td", { key: p.id },
                                        React.createElement("div", { className: "table-score" },
                                            React.createElement("span", { style: { width: pct(p.scores[key]) } }),
                                            React.createElement("b", null, p.scores[key])))))),
                                React.createElement("tr", { className: "facts-row" },
                                    React.createElement("th", null, "Toolchain"),
                                    selectedPlatforms.map(p => React.createElement("td", { key: p.id }, p.tools.slice(0, 3).join(' · ')))),
                                React.createElement("tr", { className: "facts-row" },
                                    React.createElement("th", null, "Core friction"),
                                    selectedPlatforms.map(p => React.createElement("td", { key: p.id }, p.friction))))))) : React.createElement("div", { className: "empty-state" },
                    React.createElement(Icon, { name: "compare", size: 46 }),
                    React.createElement("h2", null, "Select a platform to begin"),
                    React.createElement("p", null, "Use the selectors above or add systems from the explorer."),
                    React.createElement("button", { className: "button primary", onClick: () => setTab('explorer') }, "Open explorer"))),
            tab === 'methodology' && React.createElement("section", { className: "content-section methodology-section" },
                React.createElement("div", { className: "page-title" },
                    React.createElement("span", { className: "eyebrow" }, "Transparent scoring"),
                    React.createElement("h1", null, "What the number means\u2014and what it does not"),
                    React.createElement("p", null, "The score estimates how much of a small original game project a modern coding agent could execute reliably using publicly available knowledge and legal/open tooling. It is not a score for commercial viability, hardware quality or game-library quality.")),
                React.createElement(WeightControls, { weights: weights, setWeights: setWeights }),
                React.createElement("div", { className: "method-grid" },
                    React.createElement("article", { className: "panel" },
                        React.createElement("h2", null, "Eight dimensions"),
                        React.createElement("div", { className: "dimension-list" }, SCORE_KEYS.map((key, i) => React.createElement("div", { key: key },
                            React.createElement("span", null, String(i + 1).padStart(2, '0')),
                            React.createElement("div", null,
                                React.createElement("h3", null, scoreLabels[key]),
                                React.createElement("p", null, { documentation: 'Accuracy, completeness and discoverability of architecture/API references.', community: 'Public examples, active maintainers, tutorials and searchable problem-solving history.', toolchain: 'Ease of installing, pinning and reproducing compilers, libraries and build scripts.', debugLoop: 'Emulator fidelity, debuggers, logs, profiling and speed of test iteration.', abstraction: 'Quality of safe C/C++/framework layers that hide register-level complexity.', architecture: 'How conventional and internally coherent the CPU, memory and graphics model are.', automation: 'Fit with editors, CI, scripts, code agents, tests and machine-readable docs.', assets: 'Reliability of graphics, map, audio and packaging conversion pipelines.' }[key])))))),
                    React.createElement("article", { className: "panel" },
                        React.createElement("h2", null, "Confidence is separate from score"),
                        React.createElement("p", null, "A precise-looking score can be misleading when evidence is sparse. Each platform therefore carries an independent confidence label."),
                        React.createElement("div", { className: "confidence-defs" },
                            React.createElement("div", null,
                                React.createElement("span", { className: "confidence high" }, "High"),
                                React.createElement("p", null, "Multiple maintained tools, references, or sizable public example corpora.")),
                            React.createElement("div", null,
                                React.createElement("span", { className: "confidence medium" }, "Medium"),
                                React.createElement("p", null, "Usable tooling exists, but maintenance, documentation or verification coverage is uneven.")),
                            React.createElement("div", null,
                                React.createElement("span", { className: "confidence low" }, "Low"),
                                React.createElement("p", null, "Archival SDKs, very small communities or weak emulator/debug evidence make estimates uncertain."))),
                        React.createElement("h2", { className: "subheading" }, "Score tiers"),
                        React.createElement("div", { className: "tier-defs" }, TIER_META.map(t => React.createElement("div", { key: t.label },
                            React.createElement("i", { style: { background: t.color } }),
                            React.createElement("b", null,
                                t.min,
                                "\u2013",
                                t.min === 85 ? '100' : t.min === 70 ? '84' : t.min === 55 ? '69' : '54',
                                " \u00B7 ",
                                t.label),
                            React.createElement("p", null, t.note)))))),
                React.createElement("div", { className: "method-grid" },
                    React.createElement("article", { className: "panel" },
                        React.createElement("h2", null, "What improved over the two alternate runs"),
                        React.createElement("ul", { className: "check-list" },
                            React.createElement("li", null,
                                React.createElement(Icon, { name: "check" }),
                                "Expanded partial 23\u201330-system samples to a 62-platform scoped corpus."),
                            React.createElement("li", null,
                                React.createElement(Icon, { name: "check" }),
                                "Replaced a single unexplained score or simple category average with eight adjustable dimensions."),
                            React.createElement("li", null,
                                React.createElement(Icon, { name: "check" }),
                                "Removed absolute language such as \u201Cvirtually flawless\u201D and exposed uncertainty explicitly."),
                            React.createElement("li", null,
                                React.createElement(Icon, { name: "check" }),
                                "Separated underlying platform evidence from the user\u2019s weighting preferences."),
                            React.createElement("li", null,
                                React.createElement(Icon, { name: "check" }),
                                "Added source starting points, search, URL-persisted filters, detail sheets and three-way comparison."),
                            React.createElement("li", null,
                                React.createElement(Icon, { name: "check" }),
                                "Avoided misleading era labels such as \u201C128-bit generation\u201D and documented scope boundaries."))),
                    React.createElement("article", { className: "panel" },
                        React.createElement("h2", null, "Known limitations"),
                        React.createElement("ul", { className: "warning-list" },
                            React.createElement("li", null,
                                React.createElement(Icon, { name: "warning" }),
                                "No benchmark can directly measure an agent\u2019s latent training corpus. Public documentation and examples are observable proxies."),
                            React.createElement("li", null,
                                React.createElement(Icon, { name: "warning" }),
                                "Scores reflect small original homebrew projects, not late-generation commercial production values."),
                            React.createElement("li", null,
                                React.createElement(Icon, { name: "warning" }),
                                "Toolchains evolve. The source links provide an audit trail, but rankings should be refreshed periodically."),
                            React.createElement("li", null,
                                React.createElement(Icon, { name: "warning" }),
                                "Official proprietary SDK availability is not treated as an open, reproducible path unless a legal public alternative exists."),
                            React.createElement("li", null,
                                React.createElement(Icon, { name: "warning" }),
                                "Regional clones and functionally identical revisions are consolidated; meaningful add-ons and architecturally distinct peers are separate.")))),
                React.createElement("div", { className: "scope-banner" },
                    React.createElement(Icon, { name: "info" }),
                    React.createElement("div", null,
                        React.createElement("h2", null, "Scope rule"),
                        React.createElement("p", null, "\u201CEvery platform\u201D means major commercial consoles, handhelds, meaningful add-ons, and notable region-specific systems with enough public technical evidence to score. Hardware revisions with essentially identical development targets are consolidated. DS and PSP are included as requested even though they begin the following handheld era."))))),
        React.createElement("footer", { className: "site-footer" },
            React.createElement("div", null,
                React.createElement("span", { className: "brand-mark small" },
                    React.createElement(Icon, { name: "gamepad", size: 17 })),
                React.createElement("p", null,
                    React.createElement("b", null, "Retro AI-Dev Index"),
                    React.createElement("br", null),
                    "A transparent research model\u2014not a claim that agents can replace platform expertise.")),
            React.createElement("p", null, "React + TypeScript \u00B7 Material Design 2-inspired dark interface \u00B7 Local, dependency-light build")),
        detail && React.createElement(DetailModal, { platform: detail, score: scoreById(detail.id), onClose: () => setDetail(null), onCompare: toggleCompare, isCompared: selected.includes(detail.id) }));
}
function renderApp() {
    hookCursor = 0;
    ReactDOM.render(React.createElement(App, null), document.getElementById('root'));
}
renderApp();
