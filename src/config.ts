interface IAppConfig {
    endpoint: string
    loginBackgroundImage: string
}

const config: IAppConfig = {
    endpoint: "https://api.queryableio.com/query",
    loginBackgroundImage: 'https://api.queryableio.com/images/login-1599820914520.jpeg'
}

export default config;