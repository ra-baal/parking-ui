export interface AppConfig {
    apiUrl: string;
}

let configInstance: AppConfig | undefined;

export async function loadConfig() {
    const response = await fetch('/config.json');
    configInstance = await response.json();
}

export function config(): AppConfig {
    if (!configInstance) throw new Error('Config not loaded!');
    return configInstance;
} 
