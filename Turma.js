class Turma {
  constructor(nome, curso, professor) {
    this.nome = nome;
    this.curso = curso;
    this.professor = professor;
    this.alunos = [];
  }

  adicionarAluno(aluno) {
    this.alunos.push(aluno);
  }
}