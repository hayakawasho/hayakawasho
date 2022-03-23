import Abstract from "@/components/route/_AbstractPage";

export class DefaultPage extends Abstract {
  private constructor() {
    super();
  }

  static exec() {
    return new DefaultPage();
  }
}
