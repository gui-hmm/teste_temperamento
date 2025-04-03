import { Component, OnInit } from '@angular/core';
import quizz_questions from '../../../assets/data/quizz_questions.json';

@Component({
  selector: 'app-quizz',
  templateUrl: './quizz.component.html',
  styleUrls: ['./quizz.component.css']
})
export class QuizzComponent implements OnInit {
  title: string = "";
  subtitle: string = "";

  questions: any[] = [];
  questionSelected: any;

  answers: { alias: string, questionId: number }[] = [];
  answerSelected: string = "";
  resultDescription: string = "";
  scoreDetails: { [key: string]: number } = { 'C': 0, 'S': 0, 'M': 0, 'F': 0 };

  questionIndex: number = 0;
  questionMaxIndex: number = 0;

  finished: boolean = false;

  constructor() { }

  ngOnInit(): void {
    if (quizz_questions) {
      this.finished = false;
      this.title = quizz_questions.title;
      this.subtitle = quizz_questions.subtitle;
      this.questions = quizz_questions.questions;
      this.questionSelected = this.questions[this.questionIndex];
      this.questionMaxIndex = this.questions.length;
    }
  }

  playerChoose(value: string) {
    // Remove resposta anterior se existir
    this.answers = this.answers.filter(answer => answer.questionId !== this.questionSelected.id);

    // Adiciona nova resposta
    this.answers.push({
      alias: value,
      questionId: this.questionSelected.id
    });

    this.nextStep();
  }

  getSelectedOption(questionId: number): string | null {
    const answer = this.answers.find(a => a.questionId === questionId);
    return answer ? answer.alias : null;
  }

  nextStep() {
    this.questionIndex += 1;
    this.updateSelectedQuestion();
  }

  prevStep() {
    if (this.questionIndex > 0) {
      this.questionIndex -= 1;
      this.updateSelectedQuestion();
    }
  }

  private updateSelectedQuestion() {
    this.questionSelected = this.questions[this.questionIndex];

    // Verifica se terminou o quiz
    if (this.questionIndex >= this.questionMaxIndex) {
      this.finishQuiz();
    }
  }

  private finishQuiz() {
    this.finished = true;

    // Calcula os resultados
    this.scoreDetails = this.calculateScores();
    const finalAnswer = this.determineResult();

    this.answerSelected =
      finalAnswer === 'C' ? 'Colérico' :
      finalAnswer === 'S' ? 'Sanguíneo' :
      finalAnswer === 'M' ? 'Melancólico' : 'Fleumático';

    this.resultDescription = quizz_questions.results[finalAnswer as keyof typeof quizz_questions.results];
  }

  private calculateScores(): { [key: string]: number } {
    const scores: any = { 'C': 0, 'S': 0, 'M': 0, 'F': 0 };
    this.answers.forEach(answer => {
      scores[answer.alias]++;
    });
    return scores;
  }

  private determineResult(): string {
    const scores = this.calculateScores();
    let result: any = 'C';
    let maxScore = scores['C'];

    (Object.keys(scores) as Array<keyof typeof scores>).forEach(key => {
      if (scores[key] > maxScore) {
        maxScore = scores[key];
        result = key;
      }
    });

    return result;
  }

  restartQuiz() {
    this.answers = [];
    this.scoreDetails = { 'C': 0, 'S': 0, 'M': 0, 'F': 0 };
    this.questionIndex = 0;
    this.finished = false;
    this.answerSelected = "";
    this.resultDescription = "";
    this.questionSelected = this.questions[this.questionIndex];
  }
}
