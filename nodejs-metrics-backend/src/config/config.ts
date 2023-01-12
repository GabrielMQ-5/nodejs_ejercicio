export class Config {
  private static get(key: string) {
    return process.env[key];
  }

  static get dbUrl(): string {
    return this.get('DATABASE_URL') || '';
  }

  static get port(): number {
    return Number(this.get('PORT')) || 3001;
  }

  static get repositoryApiUrl(): string {
    return this.get('REPOSITORY_API_URL') || '';
  }
}
