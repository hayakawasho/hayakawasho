import Abstract from "@/components/page/_AbstractPage";

export class DefaultPage extends Abstract {
  private constructor() {
    super();
  }

  static exec() {
    return new DefaultPage();
  }
}
