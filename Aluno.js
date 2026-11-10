class Aluno {
  #nota1;
  #nota2;
  #nota3;

  constructor(nome, nota1, nota2, nota3) {
    this.nome = nome;
    this.#nota1 = nota1;
    this.#nota2 = nota2;
    this.#nota3 = nota3;
  }

  getNota1() {
    return this.#nota1;
  }

  setNota1(nota) {
    this.#nota1 = nota;
  }

  getNota2() {
    return this.#nota2;
  }

  setNota2(nota) {
    this.#nota2 = nota;
  }

  getNota3() {
    return this.#nota3;
  }

  setNota3(nota) {
    this.#nota3 = nota;
  }

  gerarMedia() {
    let media = (
      this.#nota1 +
      this.#nota2 +
      this.#nota3
    ) / 3;

    return media;
  }

  gerarEstado() {
    let media = this.gerarMedia();

    if (media >= 6) {
      return "Aprovado";
    } else if (media >= 3) {
      return "Recuperação";
    } else {
      return "Reprovado";
    }
  }
}
