type Config = {
    db: DBConfig;
    api: APIConfig;
};

type APIConfig = {
    port: number | undefined;
    filepathRoot: string;
};

type DBConfig = {
    url: string | undefined;
};

export const config: Config = {
    api: {
        port: undefined,
        filepathRoot: "./src/assets",
    },
    db: {
        url: undefined,
    },
};
