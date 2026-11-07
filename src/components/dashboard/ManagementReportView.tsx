'use client';

import React, { useState, useEffect, useRef } from 'react';
import { 
  Users, 
  Upload, 
  Image as ImageIcon, 
  Check, 
  Edit3, 
  RotateCcw, 
  Save, 
  Globe, 
  Compass, 
  UserCheck, 
  Star, 
  Award, 
  Printer, 
  ChevronRight,
  ShieldCheck,
  Building2,
  FileText,
  AlertCircle
} from 'lucide-react';

const DEFAULT_MISSION =
  'FashionClub tiene como misión ofrecer accesorios textiles de calidad, como corbatas, bufandas y calcetines, mediante diseños diferenciados, buenos materiales y acabados cuidadosos. Busca aprovechar su trayectoria en la moda masculina para satisfacer las preferencias de sus clientes, fortalecer su competitividad y generar valor mediante una gestión eficiente.';

const DEFAULT_INTERNATIONALIZATION =
  'En los Dashboards de 2026 a 2029 no se identifican registros que acrediten la entrada de FashionClub a nuevos países ni la apertura de fábricas en el extranjero. Las decisiones documentadas se concentraron en la gestión comercial, productiva y competitiva dentro del mercado de la simulación. Por tanto, no se atribuyen beneficios derivados de una expansión internacional no comprobada.';

const DEFAULT_METHODOLOGY =
  'FINNOVA aplicó un proceso de gestión basado en el diagnóstico económico-financiero, el análisis FODA y la planificación estratégica. Para orientar las decisiones se consideraron las áreas comerciales, productivas y financieras. Posteriormente, se efectuó el seguimiento de los indicadores y la evaluación de los resultados de cada ronda mediante los Dashboards, identificando desviaciones frente a los objetivos y oportunidades de mejora.';

const DEFAULT_TEAMWORK_IDEA_1 =
  'Análisis conjunto: las integrantes participaron en el diagnóstico empresarial y en la comprensión de la situación de FashionClub.';
const DEFAULT_TEAMWORK_IDEA_2 =
  'Coordinación de decisiones: se consideraron conjuntamente las áreas comerciales, productivas y financieras para orientar la gestión.';
const DEFAULT_TEAMWORK_IDEA_3 =
  'Aprendizaje compartido: el seguimiento de las cuatro rondas permitió reconocer resultados, evaluar decisiones y fortalecer los conocimientos empresariales.';

const DEFAULT_GLOBAL_EVALUATION =
  'La participación de FINNOVA en CORBATUL permitió aplicar conocimientos académicos en un entorno empresarial y desarrollar habilidades de planificación, análisis financiero y toma de decisiones. Entre los aspectos positivos destacan los avances comerciales, la mejora del margen bruto y la adaptación de las decisiones durante las cuatro rondas.\n\nSin embargo, persistieron dificultades financieras, pérdidas económicas y objetivos de rentabilidad que no se alcanzaron. Esta experiencia permitió comprender que el crecimiento comercial debe estar acompañado de un adecuado control de costos, liquidez y financiación.\n\nEn conjunto, la simulación fortaleció el criterio empresarial, la capacidad de análisis y el aprendizaje colaborativo, dejando oportunidades de mejora para futuras decisiones profesionales.';

export const ManagementReportView: React.FC = () => {
  // 1. Fotografía del equipo
  const [teamPhoto, setTeamPhoto] = useState<string>('/images/team_finnova.jpg');
  const [photoError, setPhotoError] = useState<boolean>(false);
  const [isDragOver, setIsDragOver] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // 2. Misión
  const [missionText, setMissionText] = useState<string>(DEFAULT_MISSION);
  const [isEditingMission, setIsEditingMission] = useState<boolean>(false);
  const [draftMission, setDraftMission] = useState<string>(DEFAULT_MISSION);

  // 3. Internacionalización
  const [intlText, setIntlText] = useState<string>(DEFAULT_INTERNATIONALIZATION);
  const [isEditingIntl, setIsEditingIntl] = useState<boolean>(false);
  const [draftIntl, setDraftIntl] = useState<string>(DEFAULT_INTERNATIONALIZATION);

  // 4. Metodología de gestión
  const [methodologyText, setMethodologyText] = useState<string>(DEFAULT_METHODOLOGY);
  const [isEditingMethodology, setIsEditingMethodology] = useState<boolean>(false);
  const [draftMethodology, setDraftMethodology] = useState<string>(DEFAULT_METHODOLOGY);

  // 5. Trabajo en equipo
  const [teamworkIdeas, setTeamworkIdeas] = useState<[string, string, string]>([
    DEFAULT_TEAMWORK_IDEA_1,
    DEFAULT_TEAMWORK_IDEA_2,
    DEFAULT_TEAMWORK_IDEA_3,
  ]);
  const [isEditingTeamwork, setIsEditingTeamwork] = useState<boolean>(false);
  const [draftTeamworkIdeas, setDraftTeamworkIdeas] = useState<[string, string, string]>([
    DEFAULT_TEAMWORK_IDEA_1,
    DEFAULT_TEAMWORK_IDEA_2,
    DEFAULT_TEAMWORK_IDEA_3,
  ]);
  const [teamworkRating, setTeamworkRating] = useState<number>(4);
  const [isEditingTeamworkRating, setIsEditingTeamworkRating] = useState<boolean>(false);
  const [draftTeamworkRating, setDraftTeamworkRating] = useState<number>(4);

  // 6. Evaluación global
  const [evaluationText, setEvaluationText] = useState<string>(DEFAULT_GLOBAL_EVALUATION);
  const [isEditingEvaluation, setIsEditingEvaluation] = useState<boolean>(false);
  const [draftEvaluation, setDraftEvaluation] = useState<string>(DEFAULT_GLOBAL_EVALUATION);
  const [recommendationRating, setRecommendationRating] = useState<number>(10);
  const [isEditingRecommendation, setIsEditingRecommendation] = useState<boolean>(false);
  const [draftRecommendation, setDraftRecommendation] = useState<number>(10);

  // Cargar datos persistidos desde localStorage al montar
  useEffect(() => {
    try {
      const savedPhoto = localStorage.getItem('finnova_team_photo');
      if (savedPhoto) setTeamPhoto(savedPhoto);

      const savedMission = localStorage.getItem('finnova_company_mission');
      if (savedMission) {
        setMissionText(savedMission);
        setDraftMission(savedMission);
      }

      const savedIntl = localStorage.getItem('finnova_internationalization_text');
      if (savedIntl) {
        setIntlText(savedIntl);
        setDraftIntl(savedIntl);
      }

      const savedMethodology = localStorage.getItem('finnova_methodology_text');
      if (savedMethodology) {
        setMethodologyText(savedMethodology);
        setDraftMethodology(savedMethodology);
      }

      const savedTeamwork = localStorage.getItem('finnova_teamwork_ideas');
      if (savedTeamwork) {
        const parsed = JSON.parse(savedTeamwork);
        if (Array.isArray(parsed) && parsed.length === 3) {
          setTeamworkIdeas(parsed as [string, string, string]);
          setDraftTeamworkIdeas(parsed as [string, string, string]);
        }
      }

      const savedTeamworkRating = localStorage.getItem('finnova_teamwork_rating');
      if (savedTeamworkRating) {
        const num = parseFloat(savedTeamworkRating);
        if (!isNaN(num) && num >= 1 && num <= 5) {
          setTeamworkRating(num);
          setDraftTeamworkRating(num);
        }
      }

      const savedEval = localStorage.getItem('finnova_global_evaluation_text');
      if (savedEval) {
        setEvaluationText(savedEval);
        setDraftEvaluation(savedEval);
      }

      const savedRecRating = localStorage.getItem('finnova_recommendation_rating');
      if (savedRecRating) {
        const num = parseFloat(savedRecRating);
        if (!isNaN(num) && num >= 1 && num <= 10) {
          setRecommendationRating(num);
          setDraftRecommendation(num);
        }
      }
    } catch {
      // Ignorar errores de localStorage en entornos restringidos
    }
  }, []);

  // Manejo de carga de fotografía
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      processPhotoFile(file);
    }
  };

  const processPhotoFile = (file: File) => {
    const reader = new FileReader();
    reader.onload = (uploadEvent) => {
      const result = uploadEvent.target?.result as string;
      if (result) {
        setTeamPhoto(result);
        setPhotoError(false);
        try {
          localStorage.setItem('finnova_team_photo', result);
        } catch {
          // localStorage excedido
        }
      }
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(false);
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith('image/')) {
      processPhotoFile(file);
    }
  };

  const handleResetPhoto = () => {
    const defaultPath = '/images/team_finnova.jpg';
    setTeamPhoto(defaultPath);
    setPhotoError(false);
    try {
      localStorage.removeItem('finnova_team_photo');
    } catch {}
  };

  // Guardado de Misión
  const handleSaveMission = () => {
    setMissionText(draftMission);
    setIsEditingMission(false);
    try {
      localStorage.setItem('finnova_company_mission', draftMission);
    } catch {}
  };

  // Guardado de Internacionalización
  const handleSaveIntl = () => {
    setIntlText(draftIntl);
    setIsEditingIntl(false);
    try {
      localStorage.setItem('finnova_internationalization_text', draftIntl);
    } catch {}
  };

  // Guardado de Metodología
  const handleSaveMethodology = () => {
    setMethodologyText(draftMethodology);
    setIsEditingMethodology(false);
    try {
      localStorage.setItem('finnova_methodology_text', draftMethodology);
    } catch {}
  };

  // Guardado de Trabajo en equipo
  const handleSaveTeamwork = () => {
    setTeamworkIdeas(draftTeamworkIdeas);
    setIsEditingTeamwork(false);
    try {
      localStorage.setItem('finnova_teamwork_ideas', JSON.stringify(draftTeamworkIdeas));
    } catch {}
  };

  const handleSaveTeamworkRating = () => {
    setTeamworkRating(draftTeamworkRating);
    setIsEditingTeamworkRating(false);
    try {
      localStorage.setItem('finnova_teamwork_rating', draftTeamworkRating.toString());
    } catch {}
  };

  // Guardado de Evaluación global
  const handleSaveEvaluation = () => {
    setEvaluationText(draftEvaluation);
    setIsEditingEvaluation(false);
    try {
      localStorage.setItem('finnova_global_evaluation_text', draftEvaluation);
    } catch {}
  };

  const handleSaveRecommendation = () => {
    setRecommendationRating(draftRecommendation);
    setIsEditingRecommendation(false);
    try {
      localStorage.setItem('finnova_recommendation_rating', draftRecommendation.toString());
    } catch {}
  };

  // Restablecer todos a los valores oficiales
  const handleResetAllToOfficial = () => {
    if (window.confirm('¿Desea restablecer todos los textos a los redactados originalmente por el equipo FINNOVA?')) {
      setMissionText(DEFAULT_MISSION);
      setDraftMission(DEFAULT_MISSION);
      setIntlText(DEFAULT_INTERNATIONALIZATION);
      setDraftIntl(DEFAULT_INTERNATIONALIZATION);
      setMethodologyText(DEFAULT_METHODOLOGY);
      setDraftMethodology(DEFAULT_METHODOLOGY);
      setTeamworkIdeas([DEFAULT_TEAMWORK_IDEA_1, DEFAULT_TEAMWORK_IDEA_2, DEFAULT_TEAMWORK_IDEA_3]);
      setDraftTeamworkIdeas([DEFAULT_TEAMWORK_IDEA_1, DEFAULT_TEAMWORK_IDEA_2, DEFAULT_TEAMWORK_IDEA_3]);
      setTeamworkRating(4);
      setDraftTeamworkRating(4);
      setEvaluationText(DEFAULT_GLOBAL_EVALUATION);
      setDraftEvaluation(DEFAULT_GLOBAL_EVALUATION);
      setRecommendationRating(10);
      setDraftRecommendation(10);
      try {
        localStorage.removeItem('finnova_company_mission');
        localStorage.removeItem('finnova_internationalization_text');
        localStorage.removeItem('finnova_methodology_text');
        localStorage.removeItem('finnova_teamwork_ideas');
        localStorage.removeItem('finnova_teamwork_rating');
        localStorage.removeItem('finnova_global_evaluation_text');
        localStorage.removeItem('finnova_recommendation_rating');
      } catch {}
    }
  };

  return (
    <div className="space-y-8 max-w-6xl mx-auto pb-16 animate-fadeIn">
      {/* 0. Banner Institucional de la Presentación Oficial */}
      <section className="bg-white border border-pastel-200/90 rounded-3xl p-6 sm:p-8 shadow-sm">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 rounded-full text-[11px] font-mono tracking-wider uppercase font-black bg-pastel-100 text-pastel-800 border border-pastel-200">
                Torneo Internacional de Simulación de Negocios
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-obsidian-100 text-obsidian-700">
                Simulación Corbatul · FashionClub
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-obsidian-950 tracking-tight">
              Informe de Gestión Directiva · Equipo FINNOVA
            </h1>
            <p className="text-xs sm:text-sm text-obsidian-600 max-w-3xl leading-relaxed">
              Compañía <strong>FashionClub</strong> &bull; Presentación de resultados, plan de actuación, gobernanza de equipo, internacionalización y balance de la simulación.
            </p>
          </div>

          <div className="flex items-center gap-2.5 shrink-0">
            <button
              onClick={() => window.print()}
              className="px-4 py-2.5 rounded-2xl bg-gradient-to-r from-pastel-500 to-pastel-600 text-white font-extrabold text-xs shadow-sunset hover:opacity-95 transition-all flex items-center gap-2 cursor-pointer"
            >
              <Printer className="w-4 h-4" />
              <span>Imprimir / Exportar PDF</span>
            </button>
            <button
              onClick={handleResetAllToOfficial}
              className="px-3 py-2.5 rounded-2xl border border-pastel-200 text-obsidian-600 hover:text-obsidian-900 hover:bg-pastel-50 font-bold text-xs transition-colors flex items-center gap-1.5"
              title="Restablecer textos por defecto"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Restablecer</span>
            </button>
          </div>
        </div>
      </section>

      {/* ========================================================
          1. PRESENTACIÓN DEL EQUIPO & FOTOGRAFÍA REAL
         ======================================================== */}
      <section className="bg-white border border-pastel-200/90 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-pastel-200/70 pb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-pastel-100 text-pastel-700 flex items-center justify-center shadow-xs">
              <Users className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-extrabold text-obsidian-950">
                Presentación del Equipo Directivo
              </h2>
              <p className="text-xs text-obsidian-500">
                Equipo FINNOVA · FashionClub
              </p>
            </div>
          </div>
          <span className="text-[11px] font-mono font-bold text-pastel-700 bg-pastel-100 px-3 py-1 rounded-full border border-pastel-200">
            FINNOVA · FashionClub
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Espacio para Cargar y Visualizar la Fotografía Grupal */}
          <div className="lg:col-span-7 space-y-4">
            <div 
              onDragOver={(e) => { e.preventDefault(); setIsDragOver(true); }}
              onDragLeave={() => setIsDragOver(false)}
              onDrop={handleDrop}
              className={`relative rounded-3xl border-2 overflow-hidden shadow-md transition-all ${
                isDragOver ? 'border-pastel-500 ring-4 ring-pastel-200' : 'border-pastel-200 bg-pastel-50/40'
              }`}
            >
              {teamPhoto && !photoError ? (
                <div className="relative group">
                  <img
                    src={teamPhoto}
                    alt="Fotografía grupal oficial - Equipo FINNOVA"
                    onError={() => setPhotoError(true)}
                    className="w-full h-auto max-h-[460px] object-cover rounded-2xl transition-transform duration-500 group-hover:scale-[1.01]"
                  />
                  <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-obsidian-950/90 via-obsidian-950/60 to-transparent p-4 sm:p-5 text-white">
                    <div className="flex items-end justify-between gap-2">
                      <div>
                        <span className="text-[10px] font-mono uppercase tracking-widest text-pastel-300 font-bold block">
                          Equipo Directivo FINNOVA
                        </span>
                        <h4 className="text-base font-extrabold text-white">
                          FashionClub · Simulación Corbatul
                        </h4>
                        <p className="text-xs text-obsidian-200 font-medium mt-0.5">
                          María Cristina Cabezas &bull; Dayana Gabriela Haro &bull; Abigail Mharley Moreno
                        </p>
                      </div>
                      <span className="text-[10px] font-mono px-2.5 py-1 rounded-lg bg-pastel-500 text-white font-black tracking-wider uppercase shrink-0">
                        Certificación Oficial
                      </span>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="p-12 text-center space-y-3">
                  <div className="w-16 h-16 rounded-3xl bg-pastel-100 border border-pastel-200 mx-auto flex items-center justify-center text-pastel-600 shadow-sunset">
                    <ImageIcon className="w-8 h-8" />
                  </div>
                  <div>
                    <h4 className="text-sm font-extrabold text-obsidian-950">
                      Espacio de Presentación de la Fotografía Grupal
                    </h4>
                    <p className="text-xs text-obsidian-500 max-w-sm mx-auto mt-1">
                      Arrastre y suelte la fotografía oficial de las tres integrantes aquí, o utilice el botón inferior para cargarla.
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Controles de Carga */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
              />
              <div className="flex items-center gap-2">
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="px-4 py-2 rounded-xl bg-pastel-500 text-white text-xs font-extrabold hover:bg-pastel-600 transition-all shadow-sunset flex items-center gap-2 cursor-pointer"
                >
                  <Upload className="w-3.5 h-3.5" />
                  <span>{teamPhoto && !photoError ? 'Cambiar Fotografía' : 'Cargar Fotografía Real'}</span>
                </button>
                {teamPhoto && !photoError && (
                  <button
                    onClick={handleResetPhoto}
                    className="px-3 py-2 rounded-xl border border-pastel-200 text-obsidian-600 text-xs font-semibold hover:bg-pastel-50 transition-colors"
                  >
                    Restablecer
                  </button>
                )}
              </div>
              <span className="text-[11px] text-obsidian-400 font-mono">
                Formatos: JPG, PNG, WEBP (Alta resolución)
              </span>
            </div>
          </div>

          {/* Tarjetas Informativas de las 3 Integrantes */}
          <div className="lg:col-span-5 space-y-3.5">
            <div className="p-4 rounded-2xl bg-pastel-50/70 border border-pastel-200 space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono uppercase font-black tracking-wider text-pastel-700">
                  Integrante 01
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-pastel-200 text-pastel-800 font-bold">
                  FINNOVA
                </span>
              </div>
              <h3 className="font-extrabold text-sm sm:text-base text-obsidian-950">
                María Cristina Cabezas Cayambe
              </h3>
              <p className="text-xs text-obsidian-600 leading-relaxed font-sans pt-0.5">
                Participación en el diagnóstico empresarial, evaluación estratégica y comprensión integral de la posición de FashionClub durante las cuatro rondas de simulación.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-pastel-50/70 border border-pastel-200 space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono uppercase font-black tracking-wider text-pastel-700">
                  Integrante 02
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-pastel-200 text-pastel-800 font-bold">
                  FINNOVA
                </span>
              </div>
              <h3 className="font-extrabold text-sm sm:text-base text-obsidian-950">
                Dayana Gabriela Haro Salazar
              </h3>
              <p className="text-xs text-obsidian-600 leading-relaxed font-sans pt-0.5">
                Participación en el análisis económico-financiero, monitoreo del balance y coordinación de las decisiones comerciales, fabriles y de tesorería.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-pastel-50/70 border border-pastel-200 space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono uppercase font-black tracking-wider text-pastel-700">
                  Integrante 03
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-pastel-200 text-pastel-800 font-bold">
                  FINNOVA
                </span>
              </div>
              <h3 className="font-extrabold text-sm sm:text-base text-obsidian-950">
                Abigail Mharley Moreno Vicente
              </h3>
              <p className="text-xs text-obsidian-600 leading-relaxed font-sans pt-0.5">
                Participación en el seguimiento causal de indicadores, análisis de cuota de mercado, evolución del margen bruto y aprendizaje compartido del equipo.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          2. PLAN DE ACTUACIÓN & MISIÓN DE LA EMPRESA
         ======================================================== */}
      <section className="bg-white border border-pastel-200/90 rounded-3xl p-6 sm:p-8 shadow-sm space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-pastel-200/70 pb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-pastel-100 text-pastel-700 flex items-center justify-center shadow-xs">
              <Compass className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-extrabold text-obsidian-950">
                Plan de Actuación · Misión de la Empresa
              </h2>
              <p className="text-xs text-obsidian-500">
                Directrices Estratégicas y Propuesta de Valor
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {isEditingMission ? (
              <>
                <button
                  onClick={handleSaveMission}
                  className="px-3 py-1.5 rounded-xl bg-emerald-600 text-white text-xs font-extrabold hover:bg-emerald-700 transition-colors shadow-xs flex items-center gap-1 cursor-pointer"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>Guardar</span>
                </button>
                <button
                  onClick={() => {
                    setDraftMission(missionText);
                    setIsEditingMission(false);
                  }}
                  className="px-3 py-1.5 rounded-xl border border-pastel-300 text-obsidian-600 text-xs font-semibold hover:bg-pastel-100 transition-colors"
                >
                  Cancelar
                </button>
              </>
            ) : (
              <button
                onClick={() => {
                  setDraftMission(missionText);
                  setIsEditingMission(true);
                }}
                className="px-3 py-1.5 rounded-xl border border-pastel-200 text-pastel-700 text-xs font-bold hover:bg-pastel-50 transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <Edit3 className="w-3.5 h-3.5" />
                <span>Editar Misión</span>
              </button>
            )}
          </div>
        </div>

        <div className="bg-gradient-to-br from-pastel-50/80 via-white to-white p-5 sm:p-6 rounded-2xl border border-pastel-200/90 space-y-3">
          <div className="flex items-center gap-2 text-xs font-black uppercase text-pastel-800 tracking-wider">
            <Compass className="w-4 h-4 text-pastel-600" />
            <span>Misión de la empresa</span>
          </div>

          {isEditingMission ? (
            <div className="space-y-2">
              <textarea
                value={draftMission}
                onChange={(e) => setDraftMission(e.target.value)}
                rows={4}
                className="w-full text-xs sm:text-sm text-obsidian-900 bg-white border border-pastel-300 rounded-xl p-3.5 focus:outline-none focus:ring-2 focus:ring-pastel-500 font-sans leading-relaxed resize-y"
              />
              <span className="text-[11px] text-obsidian-400 block">
                Texto editable para confirmación final. Sincronizado automáticamente con la Bitácora Estratégica.
              </span>
            </div>
          ) : (
            <blockquote className="text-sm sm:text-base font-serif italic text-obsidian-900 leading-relaxed border-l-4 border-pastel-500 pl-4 py-1">
              «{missionText}»
            </blockquote>
          )}
        </div>
      </section>

      {/* ========================================================
          3. INTERNACIONALIZACIÓN
         ======================================================== */}
      <section className="bg-white border border-pastel-200/90 rounded-3xl p-6 sm:p-8 shadow-sm space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-pastel-200/70 pb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-pastel-100 text-pastel-700 flex items-center justify-center shadow-xs">
              <Globe className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-extrabold text-obsidian-950">
                Internacionalización
              </h2>
              <p className="text-xs text-obsidian-500">
                Alcance Operativo y Expansión de Mercado
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {isEditingIntl ? (
              <>
                <button
                  onClick={handleSaveIntl}
                  className="px-3 py-1.5 rounded-xl bg-emerald-600 text-white text-xs font-extrabold hover:bg-emerald-700 transition-colors shadow-xs flex items-center gap-1 cursor-pointer"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>Guardar</span>
                </button>
                <button
                  onClick={() => {
                    setDraftIntl(intlText);
                    setIsEditingIntl(false);
                  }}
                  className="px-3 py-1.5 rounded-xl border border-pastel-300 text-obsidian-600 text-xs font-semibold hover:bg-pastel-100 transition-colors"
                >
                  Cancelar
                </button>
              </>
            ) : (
              <button
                onClick={() => {
                  setDraftIntl(intlText);
                  setIsEditingIntl(true);
                }}
                className="px-3 py-1.5 rounded-xl border border-pastel-200 text-pastel-700 text-xs font-bold hover:bg-pastel-50 transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <Edit3 className="w-3.5 h-3.5" />
                <span>Editar Texto</span>
              </button>
            )}
          </div>
        </div>

        <div className="bg-gradient-to-br from-pastel-50/80 via-white to-white p-5 sm:p-6 rounded-2xl border border-pastel-200/90 space-y-3">
          <div className="flex items-center gap-2 text-xs font-black uppercase text-pastel-800 tracking-wider">
            <Globe className="w-4 h-4 text-pastel-600" />
            <span>Internacionalización</span>
          </div>

          {isEditingIntl ? (
            <div className="space-y-2">
              <textarea
                value={draftIntl}
                onChange={(e) => setDraftIntl(e.target.value)}
                rows={5}
                className="w-full text-xs sm:text-sm text-obsidian-900 bg-white border border-pastel-300 rounded-xl p-3.5 focus:outline-none focus:ring-2 focus:ring-pastel-500 font-sans leading-relaxed resize-y"
              />
              <span className="text-[11px] text-obsidian-400 block">
                Texto editable para realizar una confirmación final antes de entregar.
              </span>
            </div>
          ) : (
            <p className="text-xs sm:text-sm text-obsidian-800 leading-relaxed font-sans">
              {intlText}
            </p>
          )}

          <div className="pt-2 border-t border-pastel-100 flex items-center gap-2 text-[11px] text-obsidian-500 font-medium">
            <ShieldCheck className="w-3.5 h-3.5 text-pastel-600 shrink-0" />
            <span>Verificación de auditoría: decisiones concentradas en el mercado de la simulación nacional.</span>
          </div>
        </div>
      </section>

      {/* ========================================================
          4. METODOLOGÍA DE GESTIÓN
         ======================================================== */}
      <section className="bg-white border border-pastel-200/90 rounded-3xl p-6 sm:p-8 shadow-sm space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-pastel-200/70 pb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-pastel-100 text-pastel-700 flex items-center justify-center shadow-xs">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-extrabold text-obsidian-950">
                Metodología de Gestión
              </h2>
              <p className="text-xs text-obsidian-500">
                Diagnóstico FODA, Planificación y Seguimiento
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {isEditingMethodology ? (
              <>
                <button
                  onClick={handleSaveMethodology}
                  className="px-3 py-1.5 rounded-xl bg-emerald-600 text-white text-xs font-extrabold hover:bg-emerald-700 transition-colors shadow-xs flex items-center gap-1 cursor-pointer"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>Guardar</span>
                </button>
                <button
                  onClick={() => {
                    setDraftMethodology(methodologyText);
                    setIsEditingMethodology(false);
                  }}
                  className="px-3 py-1.5 rounded-xl border border-pastel-300 text-obsidian-600 text-xs font-semibold hover:bg-pastel-100 transition-colors"
                >
                  Cancelar
                </button>
              </>
            ) : (
              <button
                onClick={() => {
                  setDraftMethodology(methodologyText);
                  setIsEditingMethodology(true);
                }}
                className="px-3 py-1.5 rounded-xl border border-pastel-200 text-pastel-700 text-xs font-bold hover:bg-pastel-50 transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <Edit3 className="w-3.5 h-3.5" />
                <span>Editar Metodología</span>
              </button>
            )}
          </div>
        </div>

        <div className="bg-gradient-to-br from-pastel-50/80 via-white to-white p-5 sm:p-6 rounded-2xl border border-pastel-200/90 space-y-4">
          <div className="flex items-center gap-2 text-xs font-black uppercase text-pastel-800 tracking-wider">
            <FileText className="w-4 h-4 text-pastel-600" />
            <span>Metodología de gestión</span>
          </div>

          {isEditingMethodology ? (
            <div className="space-y-2">
              <textarea
                value={draftMethodology}
                onChange={(e) => setDraftMethodology(e.target.value)}
                rows={5}
                className="w-full text-xs sm:text-sm text-obsidian-900 bg-white border border-pastel-300 rounded-xl p-3.5 focus:outline-none focus:ring-2 focus:ring-pastel-500 font-sans leading-relaxed resize-y"
              />
              <span className="text-[11px] text-obsidian-400 block">
                Texto editable para confirmación final antes de la defensa oficial.
              </span>
            </div>
          ) : (
            <p className="text-xs sm:text-sm text-obsidian-800 leading-relaxed font-sans">
              {methodologyText}
            </p>
          )}

          {/* Diagrama de Flujo Metodológico */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2">
            <div className="p-3 rounded-xl bg-white border border-pastel-200/80 text-center shadow-xs">
              <span className="text-[10px] font-mono uppercase font-black text-pastel-700 block">Fase 1</span>
              <span className="text-xs font-extrabold text-obsidian-900 block mt-0.5">Diagnóstico FODA</span>
              <span className="text-[10px] text-obsidian-500">Económico-Financiero</span>
            </div>
            <div className="p-3 rounded-xl bg-white border border-pastel-200/80 text-center shadow-xs">
              <span className="text-[10px] font-mono uppercase font-black text-pastel-700 block">Fase 2</span>
              <span className="text-xs font-extrabold text-obsidian-900 block mt-0.5">Planificación</span>
              <span className="text-[10px] text-obsidian-500">Comercial & Fabril</span>
            </div>
            <div className="p-3 rounded-xl bg-white border border-pastel-200/80 text-center shadow-xs">
              <span className="text-[10px] font-mono uppercase font-black text-pastel-700 block">Fase 3</span>
              <span className="text-xs font-extrabold text-obsidian-900 block mt-0.5">Seguimiento</span>
              <span className="text-[10px] text-obsidian-500">Dashboards & KPIs</span>
            </div>
            <div className="p-3 rounded-xl bg-white border border-pastel-200/80 text-center shadow-xs">
              <span className="text-[10px] font-mono uppercase font-black text-pastel-700 block">Fase 4</span>
              <span className="text-xs font-extrabold text-obsidian-900 block mt-0.5">Evaluación Causal</span>
              <span className="text-[10px] text-obsidian-500">Desviaciones & Ajustes</span>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          5. TRABAJO EN EQUIPO
         ======================================================== */}
      <section className="bg-white border border-pastel-200/90 rounded-3xl p-6 sm:p-8 shadow-sm space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-pastel-200/70 pb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-pastel-100 text-pastel-700 flex items-center justify-center shadow-xs">
              <UserCheck className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-extrabold text-obsidian-950">
                Trabajo en Equipo
              </h2>
              <p className="text-xs text-obsidian-500">
                Coordinación, Análisis Conjunto y Aprendizaje
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {isEditingTeamwork ? (
              <>
                <button
                  onClick={handleSaveTeamwork}
                  className="px-3 py-1.5 rounded-xl bg-emerald-600 text-white text-xs font-extrabold hover:bg-emerald-700 transition-colors shadow-xs flex items-center gap-1 cursor-pointer"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>Guardar Ideas</span>
                </button>
                <button
                  onClick={() => {
                    setDraftTeamworkIdeas(teamworkIdeas);
                    setIsEditingTeamwork(false);
                  }}
                  className="px-3 py-1.5 rounded-xl border border-pastel-300 text-obsidian-600 text-xs font-semibold hover:bg-pastel-100 transition-colors"
                >
                  Cancelar
                </button>
              </>
            ) : (
              <button
                onClick={() => {
                  setDraftTeamworkIdeas(teamworkIdeas);
                  setIsEditingTeamwork(true);
                }}
                className="px-3 py-1.5 rounded-xl border border-pastel-200 text-pastel-700 text-xs font-bold hover:bg-pastel-50 transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <Edit3 className="w-3.5 h-3.5" />
                <span>Editar Ideas</span>
              </button>
            )}
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center gap-2 text-xs font-black uppercase text-pastel-800 tracking-wider">
            <UserCheck className="w-4 h-4 text-pastel-600" />
            <span>Trabajo en equipo</span>
          </div>

          {/* Tres Ideas Clave */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Idea 1 */}
            <div className="p-4 rounded-2xl bg-pastel-50/70 border border-pastel-200 space-y-2">
              <div className="flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-pastel-500 text-white text-[11px] font-black flex items-center justify-center">
                  1
                </span>
                <h4 className="text-xs font-extrabold text-obsidian-950 uppercase tracking-wide">
                  Análisis conjunto
                </h4>
              </div>
              {isEditingTeamwork ? (
                <textarea
                  value={draftTeamworkIdeas[0]}
                  onChange={(e) => setDraftTeamworkIdeas([e.target.value, draftTeamworkIdeas[1], draftTeamworkIdeas[2]])}
                  rows={4}
                  className="w-full text-xs text-obsidian-900 bg-white border border-pastel-300 rounded-xl p-2.5 focus:outline-none focus:ring-2 focus:ring-pastel-500 font-sans leading-relaxed resize-y"
                />
              ) : (
                <p className="text-xs text-obsidian-700 leading-relaxed font-sans">
                  {teamworkIdeas[0]}
                </p>
              )}
            </div>

            {/* Idea 2 */}
            <div className="p-4 rounded-2xl bg-pastel-50/70 border border-pastel-200 space-y-2">
              <div className="flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-pastel-500 text-white text-[11px] font-black flex items-center justify-center">
                  2
                </span>
                <h4 className="text-xs font-extrabold text-obsidian-950 uppercase tracking-wide">
                  Coordinación de decisiones
                </h4>
              </div>
              {isEditingTeamwork ? (
                <textarea
                  value={draftTeamworkIdeas[1]}
                  onChange={(e) => setDraftTeamworkIdeas([draftTeamworkIdeas[0], e.target.value, draftTeamworkIdeas[2]])}
                  rows={4}
                  className="w-full text-xs text-obsidian-900 bg-white border border-pastel-300 rounded-xl p-2.5 focus:outline-none focus:ring-2 focus:ring-pastel-500 font-sans leading-relaxed resize-y"
                />
              ) : (
                <p className="text-xs text-obsidian-700 leading-relaxed font-sans">
                  {teamworkIdeas[1]}
                </p>
              )}
            </div>

            {/* Idea 3 */}
            <div className="p-4 rounded-2xl bg-pastel-50/70 border border-pastel-200 space-y-2">
              <div className="flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-pastel-500 text-white text-[11px] font-black flex items-center justify-center">
                  3
                </span>
                <h4 className="text-xs font-extrabold text-obsidian-950 uppercase tracking-wide">
                  Aprendizaje compartido
                </h4>
              </div>
              {isEditingTeamwork ? (
                <textarea
                  value={draftTeamworkIdeas[2]}
                  onChange={(e) => setDraftTeamworkIdeas([draftTeamworkIdeas[0], draftTeamworkIdeas[1], e.target.value])}
                  rows={4}
                  className="w-full text-xs text-obsidian-900 bg-white border border-pastel-300 rounded-xl p-2.5 focus:outline-none focus:ring-2 focus:ring-pastel-500 font-sans leading-relaxed resize-y"
                />
              ) : (
                <p className="text-xs text-obsidian-700 leading-relaxed font-sans">
                  {teamworkIdeas[2]}
                </p>
              )}
            </div>
          </div>

          {/* Campo Numérico Editable: Contribución del trabajo en equipo: 4/5 */}
          <div className="p-5 rounded-2xl bg-gradient-to-r from-pastel-100/80 via-pastel-50 to-white border border-pastel-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="text-[10px] font-mono uppercase font-black tracking-wider text-pastel-700 block">
                Métrica Cuantitativa de Desempeño
              </span>
              <h4 className="text-sm font-extrabold text-obsidian-950">
                Contribución del trabajo en equipo
              </h4>
              <p className="text-xs text-obsidian-500 mt-0.5">
                Evaluación colegiada de la colaboración entre las tres integrantes.
              </p>
            </div>

            <div className="flex items-center gap-3">
              {isEditingTeamworkRating ? (
                <div className="flex items-center gap-2">
                  <select
                    value={draftTeamworkRating}
                    onChange={(e) => setDraftTeamworkRating(parseInt(e.target.value))}
                    className="px-3 py-1.5 rounded-xl border border-pastel-300 bg-white font-mono font-black text-sm text-obsidian-900 focus:outline-none focus:ring-2 focus:ring-pastel-500"
                  >
                    {[1, 2, 3, 4, 5].map((val) => (
                      <option key={val} value={val}>
                        {val}/5
                      </option>
                    ))}
                  </select>
                  <button
                    onClick={handleSaveTeamworkRating}
                    className="px-3 py-1.5 rounded-xl bg-emerald-600 text-white text-xs font-bold hover:bg-emerald-700 shadow-xs"
                  >
                    Guardar
                  </button>
                  <button
                    onClick={() => {
                      setDraftTeamworkRating(teamworkRating);
                      setIsEditingTeamworkRating(false);
                    }}
                    className="px-2.5 py-1.5 rounded-xl border border-pastel-200 text-xs text-obsidian-600"
                  >
                    Cancelar
                  </button>
                </div>
              ) : (
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((val) => (
                      <span
                        key={val}
                        className={`text-lg ${val <= teamworkRating ? 'text-amber-500' : 'text-pastel-200'}`}
                      >
                        ★
                      </span>
                    ))}
                  </div>
                  <span className="font-mono text-xl font-black text-obsidian-950 px-3 py-1 rounded-xl bg-white border border-pastel-200 shadow-xs">
                    {teamworkRating}/5
                  </span>
                  <button
                    onClick={() => {
                      setDraftTeamworkRating(teamworkRating);
                      setIsEditingTeamworkRating(true);
                    }}
                    className="text-xs text-pastel-700 hover:text-pastel-900 font-semibold underline cursor-pointer"
                  >
                    Editar calificación
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          6. EVALUACIÓN GLOBAL
         ======================================================== */}
      <section className="bg-white border border-pastel-200/90 rounded-3xl p-6 sm:p-8 shadow-sm space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-pastel-200/70 pb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-pastel-100 text-pastel-700 flex items-center justify-center shadow-xs">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-extrabold text-obsidian-950">
                Evaluación Global
              </h2>
              <p className="text-xs text-obsidian-500">
                Balance Estratégico y Calificación de la Experiencia
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {isEditingEvaluation ? (
              <>
                <button
                  onClick={handleSaveEvaluation}
                  className="px-3 py-1.5 rounded-xl bg-emerald-600 text-white text-xs font-extrabold hover:bg-emerald-700 transition-colors shadow-xs flex items-center gap-1 cursor-pointer"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>Guardar</span>
                </button>
                <button
                  onClick={() => {
                    setDraftEvaluation(evaluationText);
                    setIsEditingEvaluation(false);
                  }}
                  className="px-3 py-1.5 rounded-xl border border-pastel-300 text-obsidian-600 text-xs font-semibold hover:bg-pastel-100 transition-colors"
                >
                  Cancelar
                </button>
              </>
            ) : (
              <button
                onClick={() => {
                  setDraftEvaluation(evaluationText);
                  setIsEditingEvaluation(true);
                }}
                className="px-3 py-1.5 rounded-xl border border-pastel-200 text-pastel-700 text-xs font-bold hover:bg-pastel-50 transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <Edit3 className="w-3.5 h-3.5" />
                <span>Editar Evaluación</span>
              </button>
            )}
          </div>
        </div>

        <div className="bg-gradient-to-br from-pastel-50/80 via-white to-white p-5 sm:p-6 rounded-2xl border border-pastel-200/90 space-y-4">
          <div className="flex items-center gap-2 text-xs font-black uppercase text-pastel-800 tracking-wider">
            <Award className="w-4 h-4 text-pastel-600" />
            <span>Evaluación global</span>
          </div>

          {isEditingEvaluation ? (
            <div className="space-y-2">
              <textarea
                value={draftEvaluation}
                onChange={(e) => setDraftEvaluation(e.target.value)}
                rows={9}
                className="w-full text-xs sm:text-sm text-obsidian-900 bg-white border border-pastel-300 rounded-xl p-3.5 focus:outline-none focus:ring-2 focus:ring-pastel-500 font-sans leading-relaxed resize-y"
              />
              <span className="text-[11px] text-obsidian-400 block">
                Texto editable de cierre y balance gerencial para confirmación final.
              </span>
            </div>
          ) : (
            <div className="space-y-3 text-xs sm:text-sm text-obsidian-800 leading-relaxed font-sans">
              {evaluationText.split('\n\n').map((paragraph, idx) => (
                <p key={idx}>{paragraph}</p>
              ))}
            </div>
          )}

          {/* Campo Numérico Independiente: ¿Recomendarías esta experiencia? Escala 1 a 10 */}
          <div className="pt-4 border-t border-pastel-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="text-[10px] font-mono uppercase font-black tracking-wider text-pastel-700 block">
                Índice de Recomendación
              </span>
              <h4 className="text-sm font-extrabold text-obsidian-950">
                ¿Recomendarías esta experiencia?
              </h4>
              <p className="text-xs text-obsidian-500 mt-0.5">
                Escala de 1 a 10, editable para introducir nuestra calificación definitiva.
              </p>
            </div>

            <div className="flex items-center gap-3">
              {isEditingRecommendation ? (
                <div className="flex items-center gap-2">
                  <select
                    value={draftRecommendation}
                    onChange={(e) => setDraftRecommendation(parseInt(e.target.value))}
                    className="px-3 py-1.5 rounded-xl border border-pastel-300 bg-white font-mono font-black text-sm text-obsidian-900 focus:outline-none focus:ring-2 focus:ring-pastel-500"
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((val) => (
                      <option key={val} value={val}>
                        {val}/10
                      </option>
                    ))}
                  </select>
                  <button
                    onClick={handleSaveRecommendation}
                    className="px-3 py-1.5 rounded-xl bg-emerald-600 text-white text-xs font-bold hover:bg-emerald-700 shadow-xs"
                  >
                    Guardar
                  </button>
                  <button
                    onClick={() => {
                      setDraftRecommendation(recommendationRating);
                      setIsEditingRecommendation(false);
                    }}
                    className="px-2.5 py-1.5 rounded-xl border border-pastel-200 text-xs text-obsidian-600"
                  >
                    Cancelar
                  </button>
                </div>
              ) : (
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-0.5">
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((val) => (
                      <span
                        key={val}
                        className={`text-sm ${val <= recommendationRating ? 'text-pastel-500 font-bold' : 'text-pastel-200'}`}
                      >
                        ●
                      </span>
                    ))}
                  </div>
                  <span className="font-mono text-xl font-black text-pastel-600 px-3 py-1 rounded-xl bg-white border border-pastel-200 shadow-xs">
                    {recommendationRating}/10
                  </span>
                  <button
                    onClick={() => {
                      setDraftRecommendation(recommendationRating);
                      setIsEditingRecommendation(true);
                    }}
                    className="text-xs text-pastel-700 hover:text-pastel-900 font-semibold underline cursor-pointer"
                  >
                    Editar calificación
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
