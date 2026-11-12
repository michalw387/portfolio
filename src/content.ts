// Cała treść strony w jednym miejscu — edytuj tutaj, komponenty tylko ją renderują.

export type Lang = 'pl' | 'en'

export const links = {
  github: 'https://github.com/michalw387',
  linkedin: 'https://www.linkedin.com/in/micha%C5%82-wi%C5%9Bniewski-505abb277/',
  email: 'michal.wisniewski387@gmail.com',
  cv: './CV_Michal_Wisniewski.pdf',
}

export type Project = {
  title: string
  description: string
  tags: string[]
  /** motyw graficzny podglądu */
  art: 'summon' | 'home' | 'face' | 'queens' | 'mlp' | 'eeg'
  repo?: string
  details?: string
  /** etykieta zamiast przycisków, gdy kod nie jest publiczny */
  note?: string
}

type Content = {
  nav: { about: string; projects: string; skills: string; achievements: string; contact: string; cv: string }
  hero: { hello: string; role: string; lead: string; ctaProjects: string; ctaContact: string; scroll: string }
  about: { kicker: string; title: string; paragraphs: string[]; facts: { value: string; label: string }[] }
  skills: { kicker: string; title: string; groups: { title: string; items: string[] }[] }
  projects: { kicker: string; title: string; subtitle: string; code: string; details: string; items: Project[] }
  timeline: {
    kicker: string
    title: string
    education: string
    achievements: string
    educationItems: { period: string; title: string; place: string; text?: string }[]
    achievementItems: { period: string; title: string; text: string }[]
  }
  contact: { kicker: string; title: string; text: string; mail: string; copied: string; copy: string }
  footer: string
}

const gh = (repo: string) => `${links.github}/${repo}`

export const content: Record<Lang, Content> = {
  pl: {
    nav: {
      about: 'O mnie',
      projects: 'Projekty',
      skills: 'Umiejętności',
      achievements: 'Osiągnięcia',
      contact: 'Kontakt',
      cv: 'Pobierz CV',
    },
    hero: {
      hello: 'Cześć, jestem',
      role: 'Machine Learning & Software Developer',
      lead: 'Student inżynierii systemów na Politechnice Wrocławskiej. Budowałem modele ML na sygnałach EEG, a po godzinach piszę narzędzia i mody, których sam używam.',
      ctaProjects: 'Zobacz projekty',
      ctaContact: 'Skontaktuj się',
      scroll: 'przewiń',
    },
    about: {
      kicker: '01 — O mnie',
      title: 'Od olimpiady z algorytmiki do sygnałów z mózgu',
      paragraphs: [
        'Studiuję inżynierię systemów na Politechnice Wrocławskiej. W Kole Naukowym Neuroinformatyki „Neuron” pracowałem nad projektami uczenia maszynowego opartymi na EEG: prowadziłem czteroosobowy zespół budujący system wykrywania emocji z sygnałów EEG, a w sekcji AI projektu NeuroGuard rozwijałem modele do weryfikacji biometrycznej.',
        'Lubię doprowadzać rzeczy do końca: od sieci neuronowej napisanej od zera w NumPy, przez optymalizację w CPLEX, po mody do gier w C# i aplikacje, które codziennie działają w tle. Podczas NeuroHackathonu wspierałem uczestników technicznie przy obsłudze sprzętu EEG.',
      ],
      facts: [
        { value: 'EEG + ML', label: 'główny obszar zainteresowań' },
        { value: '4 os.', label: 'zespół, który prowadziłem' },
        { value: 'II etap', label: '29. Olimpiada Informatyczna' },
        { value: 'C1', label: 'język angielski' },
      ],
    },
    skills: {
      kicker: '02 — Umiejętności',
      title: 'Tech stack',
      groups: [
        { title: 'Języki', items: ['Python', 'C++', 'C#', 'SQL'] },
        {
          title: 'Machine Learning & Data',
          items: ['PyTorch', 'NumPy', 'pandas', 'CNN', 'Przetwarzanie sygnałów EEG', 'CPLEX / optymalizacja'],
        },
        {
          title: 'Aplikacje & narzędzia',
          items: ['Streamlit', 'SQLAlchemy', 'Playwright', 'BepInEx / Harmony', '.NET', 'pytest'],
        },
        { title: 'Środowisko pracy', items: ['Git & GitHub', 'Linux', 'mypy / ruff', 'Praca zespołowa', 'Angielski C1'] },
      ],
    },
    projects: {
      kicker: '03 — Projekty',
      title: 'Wybrane projekty',
      subtitle: 'Od badań nad EEG po narzędzia, które działają na co dzień.',
      code: 'Kod',
      details: 'Szczegóły',
      items: [
        {
          title: 'EEG Emotion Detection',
          description:
            'System wykrywania emocji na podstawie sygnałów EEG, realizowany w Kole Naukowym Neuron. Byłem liderem czteroosobowego zespołu.',
          tags: ['Python', 'EEG', 'Machine Learning', 'Team Lead'],
          art: 'eeg',
          note: 'Projekt koła naukowego',
        },
        {
          title: 'Summon Commander',
          description:
            'Autorski mod do Valheim: śledzenie i wydawanie komend przywołanym jednostkom. Skróty klawiszowe, panele HUD, znaczniki na minimapie i poprawki limitów przywołań. Następca Skeleton Commandera.',
          tags: ['C#', '.NET', 'BepInEx', 'Harmony', 'Unity'],
          art: 'summon',
          repo: gh('SummonCommander'),
          details: gh('SummonCommander') + '#readme',
        },
        {
          title: 'Otodom Analyzer',
          description:
            'Osobisty asystent szukania mieszkań: cyklicznie skanuje nowe ogłoszenia, ocenia je przez AI w skali 0–100 według własnych kryteriów, wykrywa duplikaty i wysyła powiadomienia o najlepszych ofertach oraz obniżkach cen.',
          tags: ['Python', 'Streamlit', 'SQLAlchemy', 'Playwright', 'LLM'],
          art: 'home',
          repo: gh('otodom-analyzer'),
          details: gh('otodom-analyzer') + '#readme',
        },
        {
          title: 'Facial Emotion Recognition',
          description:
            'Konwolucyjna sieć neuronowa w PyTorch rozpoznająca emocje z twarzy. Detekcja 68 punktów charakterystycznych, trening na zbiorze RAVDESS, działanie na obrazie z kamery.',
          tags: ['Python', 'PyTorch', 'CNN', 'Computer Vision'],
          art: 'face',
          repo: gh('facial_emotion_recognition'),
          details: gh('facial_emotion_recognition') + '#readme',
        },
        {
          title: 'N Queens 3D',
          description:
            'Problem N hetmanów na szachownicy N×N×N: model optymalizacyjny w CPLEX, symulowane wyżarzanie dla wersji 2D oraz wizualizacja rozwiązań w Pythonie. Projekt dwuosobowy.',
          tags: ['Python', 'CPLEX', 'Optymalizacja', 'Wizualizacja 3D'],
          art: 'queens',
          repo: gh('N_queens'),
          details: gh('N_queens') + '#readme',
        },
        {
          title: 'MLP from Scratch',
          description:
            'Wielowarstwowy perceptron do rozpoznawania cyfr napisany od zera, z własną propagacją wsteczną, zestawiony z równoważnym modelem w PyTorch.',
          tags: ['Python', 'NumPy', 'PyTorch', 'Deep Learning'],
          art: 'mlp',
          repo: gh('Multilayer-Perceptron-from-Scratch-for-Digits-Recognition'),
        },
      ],
    },
    timeline: {
      kicker: '04 — Wykształcenie & Osiągnięcia',
      title: 'Droga do tej pory',
      education: 'Wykształcenie i działalność',
      achievements: 'Osiągnięcia',
      educationItems: [
        {
          period: '2022 — obecnie',
          title: 'Inżynieria Systemów',
          place: 'Politechnika Wrocławska',
        },
        {
          period: 'KN Neuron',
          title: 'NeuroGuard — sekcja AI',
          place: 'Koło Naukowe Neuroinformatyki „Neuron”',
          text: 'Modele do weryfikacji biometrycznej na podstawie danych EEG.',
        },
        {
          period: 'KN Neuron',
          title: 'Lider zespołu — EEG Emotion Detection',
          place: 'Koło Naukowe Neuroinformatyki „Neuron”',
          text: 'Prowadzenie czteroosobowego zespołu projektowego.',
        },
        {
          period: '2019 — 2022',
          title: 'II Liceum Ogólnokształcące',
          place: 'Legnica',
        },
      ],
      achievementItems: [
        {
          period: '02.2022',
          title: 'II etap 29. Olimpiady Informatycznej',
          text: 'Udział w drugim etapie ogólnopolskiej olimpiady algorytmicznej.',
        },
        {
          period: '2021 i 2022',
          title: 'Laureat konkursu Studium Talent',
          text: 'Dwukrotny tytuł laureata ogólnopolskiego konkursu z matematyki.',
        },
        {
          period: 'NeuroHackathon',
          title: 'Zespół wsparcia technicznego',
          text: 'Pomoc uczestnikom w obsłudze sprzętu EEG i rozwiązywaniu problemów.',
        },
      ],
    },
    contact: {
      kicker: '05 — Kontakt',
      title: 'Porozmawiajmy',
      text: 'Szukam stażu lub pierwszej pracy, w której wykorzystam Pythona, ML i chęć szybkiej nauki. Najszybciej złapiesz mnie mailowo.',
      mail: 'Napisz do mnie',
      copy: 'Kopiuj adres',
      copied: 'Skopiowano!',
    },
    footer: 'Zaprojektowane i zbudowane w React, TypeScript, Tailwind CSS i Three.js.',
  },

  en: {
    nav: {
      about: 'About',
      projects: 'Projects',
      skills: 'Skills',
      achievements: 'Achievements',
      contact: 'Contact',
      cv: 'Download CV',
    },
    hero: {
      hello: "Hi, I'm",
      role: 'Machine Learning & Software Developer',
      lead: 'Systems Engineering student at Wrocław University of Science and Technology. I have built ML models on EEG signals, and in my spare time I write tools and mods I use myself.',
      ctaProjects: 'View projects',
      ctaContact: 'Get in touch',
      scroll: 'scroll',
    },
    about: {
      kicker: '01 — About',
      title: 'From algorithm olympiads to brain signals',
      paragraphs: [
        'I study Systems Engineering at Wrocław University of Science and Technology. In the Neuroinformatics Scientific Club “Neuron” I worked on machine learning projects based on EEG: I led a team of four building an EEG-based emotion detection system and developed biometric verification models in the AI section of the NeuroGuard project.',
        'I like finishing things: from a neural network written from scratch in NumPy, through optimisation in CPLEX, to game mods in C# and apps that run in the background every day. At NeuroHackathon I was part of the technical support team, helping participants with EEG hardware.',
      ],
      facts: [
        { value: 'EEG + ML', label: 'main area of interest' },
        { value: '4 people', label: 'team I led' },
        { value: '2nd stage', label: '29th Olympiad in Informatics' },
        { value: 'C1', label: 'English' },
      ],
    },
    skills: {
      kicker: '02 — Skills',
      title: 'Tech stack',
      groups: [
        { title: 'Languages', items: ['Python', 'C++', 'C#', 'SQL'] },
        {
          title: 'Machine Learning & Data',
          items: ['PyTorch', 'NumPy', 'pandas', 'CNN', 'EEG signal processing', 'CPLEX / optimisation'],
        },
        {
          title: 'Apps & tooling',
          items: ['Streamlit', 'SQLAlchemy', 'Playwright', 'BepInEx / Harmony', '.NET', 'pytest'],
        },
        { title: 'Workflow', items: ['Git & GitHub', 'Linux', 'mypy / ruff', 'Teamwork', 'English C1'] },
      ],
    },
    projects: {
      kicker: '03 — Projects',
      title: 'Featured projects',
      subtitle: 'From EEG research to tools that run every day.',
      code: 'Code',
      details: 'Details',
      items: [
        {
          title: 'EEG Emotion Detection',
          description:
            'A system detecting emotions from EEG signals, built in the Neuron Scientific Club. I led the team of four.',
          tags: ['Python', 'EEG', 'Machine Learning', 'Team Lead'],
          art: 'eeg',
          note: 'Scientific club project',
        },
        {
          title: 'Summon Commander',
          description:
            'My own Valheim mod for tracking and commanding summoned units: hotkeys, HUD panels, minimap pins and summon limit fixes. The successor of Skeleton Commander.',
          tags: ['C#', '.NET', 'BepInEx', 'Harmony', 'Unity'],
          art: 'summon',
          repo: gh('SummonCommander'),
          details: gh('SummonCommander') + '#readme',
        },
        {
          title: 'Otodom Analyzer',
          description:
            'A personal flat-hunting assistant: periodically scans new listings, scores them 0–100 with AI against custom criteria, detects duplicates and sends notifications about top offers and price drops.',
          tags: ['Python', 'Streamlit', 'SQLAlchemy', 'Playwright', 'LLM'],
          art: 'home',
          repo: gh('otodom-analyzer'),
          details: gh('otodom-analyzer') + '#readme',
        },
        {
          title: 'Facial Emotion Recognition',
          description:
            'A convolutional neural network in PyTorch recognising emotions from faces. 68-point facial landmark detection, trained on the RAVDESS dataset, works on a live camera feed.',
          tags: ['Python', 'PyTorch', 'CNN', 'Computer Vision'],
          art: 'face',
          repo: gh('facial_emotion_recognition'),
          details: gh('facial_emotion_recognition') + '#readme',
        },
        {
          title: 'N Queens 3D',
          description:
            'The N Queens problem on an N×N×N board: an optimisation model in CPLEX, simulated annealing for the 2D case and a Python visualisation of the solutions. A two-person project.',
          tags: ['Python', 'CPLEX', 'Optimisation', '3D visualisation'],
          art: 'queens',
          repo: gh('N_queens'),
          details: gh('N_queens') + '#readme',
        },
        {
          title: 'MLP from Scratch',
          description:
            'A multilayer perceptron for digit recognition written from scratch with hand-made backpropagation, compared against an equivalent PyTorch model.',
          tags: ['Python', 'NumPy', 'PyTorch', 'Deep Learning'],
          art: 'mlp',
          repo: gh('Multilayer-Perceptron-from-Scratch-for-Digits-Recognition'),
        },
      ],
    },
    timeline: {
      kicker: '04 — Education & Achievements',
      title: 'The path so far',
      education: 'Education & activity',
      achievements: 'Achievements',
      educationItems: [
        {
          period: '2022 — now',
          title: 'Systems Engineering',
          place: 'Wrocław University of Science and Technology',
        },
        {
          period: 'SC Neuron',
          title: 'NeuroGuard — AI section',
          place: 'Neuroinformatics Scientific Club “Neuron”',
          text: 'Biometric verification models based on EEG data.',
        },
        {
          period: 'SC Neuron',
          title: 'Team lead — EEG Emotion Detection',
          place: 'Neuroinformatics Scientific Club “Neuron”',
          text: 'Leading a four-person project team.',
        },
        {
          period: '2019 — 2022',
          title: 'II High School',
          place: 'Legnica',
        },
      ],
      achievementItems: [
        {
          period: '02.2022',
          title: '2nd stage of the 29th Olympiad in Informatics',
          text: 'Qualified for the second stage of the national algorithmic olympiad.',
        },
        {
          period: '2021 & 2022',
          title: 'Laureate of the Studium Talent competition',
          text: 'Two-time laureate of the nationwide mathematics competition.',
        },
        {
          period: 'NeuroHackathon',
          title: 'Technical support team',
          text: 'Helping participants with EEG hardware operation and troubleshooting.',
        },
      ],
    },
    contact: {
      kicker: '05 — Contact',
      title: "Let's talk",
      text: 'I am looking for an internship or a first job where I can use Python, ML and my drive to learn fast. Email is the quickest way to reach me.',
      mail: 'Email me',
      copy: 'Copy address',
      copied: 'Copied!',
    },
    footer: 'Designed and built with React, TypeScript, Tailwind CSS and Three.js.',
  },
}
