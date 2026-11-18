import React, { useState } from "react";
import { BookOpen, Plus, ShieldCheck } from "lucide-react";

interface CourseItem {
  id: number;
  nome: string;
  faculdade: string;
  codigo: string;
  ativo: boolean;
}

export const CoursesManagementPanel: React.FC = () => {
  const [novoCursoNome, setNovoCursoNome] = useState("");

  // Lista inicial de cursos da Faculdade de Engenharia
  const [cursos, setCursos] = useState<CourseItem[]>([
    {
      id: 1,
      nome: "Engenharia Informática",
      faculdade: "Faculdade de Engenharia",
      codigo: "ENG-01",
      ativo: true,
    },
    {
      id: 2,
      nome: "Engenharia Civil",
      faculdade: "Faculdade de Engenharia",
      codigo: "ENG-02",
      ativo: true,
    },
    {
      id: 3,
      nome: "Engenharia Agronômica",
      faculdade: "Faculdade de Engenharia",
      codigo: "ENG-03",
      ativo: true,
    },
    {
      id: 4,
      nome: "Engenharia Eletrotécnica",
      faculdade: "Faculdade de Engenharia",
      codigo: "ENG-04",
      ativo: true,
    },
  ]);
  const handleAddCourse = (e: React.FormEvent) => {
    e.preventDefault();
    if (!novoCursoNome.trim()) return;

    const novoId = cursos.length + 1;
    const novoCurso: CourseItem = {
      id: novoId,
      nome: novoCursoNome.trim(),
      faculdade: "Faculdade de Engenharia",
      codigo: `ENG-0${novoId}`,
      ativo: true,
    };

    setCursos([...cursos, novoCurso]);
    setNovoCursoNome("");
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 p-6 sm:p-8 shadow-sm space-y-6">
      {/* Cabeçalho da Secção + Formulário de Adição */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-2">
        <div className="space-y-1">
          <h3 className="font-bold text-slate-900 text-lg">
            Cursos da Faculdade
          </h3>
          <p className="text-xs text-slate-500">
            Catálogo usado nos dados académicos dos estudantes.
          </p>
        </div>
        {/* Formulário Adicionar Curso */}
        <form
          onSubmit={handleAddCourse}
          className="space-y-1.5 w-full md:w-auto"
        >
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
            curso
          </label>
          <div className="flex items-center space-x-2">
            <input
              type="text"
              placeholder="Nome do curso"
              value={novoCursoNome}
              onChange={(e) => setNovoCursoNome(e.target.value)}
              className="w-full md:w-64 px-4 py-2.5 bg-white border border-slate-300 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-[#0f2c33] focus:ring-2 focus:ring-[#0f2c33]/20 transition-all"
            />
            <button
              type="submit"
              className="bg-[#0f2c33] hover:bg-[#15363d] text-white text-xs font-semibold py-2.5 px-4 rounded-xl shadow-sm transition-all flex items-center justify-center space-x-1.5 shrink-0"
            >
              <Plus className="w-4 h-4" />
              <span>adicionar</span>
            </button>
          </div>
        </form>
      </div>

      {/* Grelha de Cartões de Cursos */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
        {cursos.map((curso) => (
          <div
            key={curso.id}
            className="border border-slate-200/80 rounded-2xl p-5 flex items-center justify-between bg-slate-50/40 hover:border-slate-300 transition-all"
          >
            <div className="flex items-center space-x-4">
              <div className="bg-white p-3 rounded-xl border border-slate-200/60 text-[#0f2c33]">
                <BookOpen className="w-5 h-5" />
              </div>
              <div className="space-y-0.5">
                <h4 className="font-bold text-sm text-slate-900">
                  {curso.nome}
                </h4>
                <p className="text-[11px] text-slate-500">
                  {curso.faculdade} · Código {curso.codigo}
                </p>
              </div>
            </div>

            <span className="bg-emerald-50 text-emerald-700 border border-emerald-200/80 text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
              Ativo
            </span>
          </div>
        ))}
      </div>

      {/* Rodapé Informativo */}
      <div className="bg-[#fafaf9] border border-slate-200/80 rounded-2xl p-4 flex items-center space-x-3 text-xs text-slate-500 pt-4 mt-6">
        <ShieldCheck className="w-4 h-4 text-[#0f2c33] shrink-0" />
        <span>
          A auditoria apresentada é de demonstração e ilustra o registo de
          autor, estado anterior/novo, comentário e data/hora.
        </span>
      </div>
    </div>
  );
};
