const DEFAULT_DELAY_MS = 250;

export abstract class MockServiceBase {
  protected delay(ms: number = DEFAULT_DELAY_MS): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}
