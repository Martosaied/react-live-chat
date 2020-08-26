import local from 'configs/local'
import prod from 'configs/prod'

const config: any = Object.assign({}, prod)

Object.keys(config).forEach((key) => {
	config[key] = {}
	Object.defineProperty(config, key, {
		get() {
            const env = process.env.NODE_ENV
			const cfg = getEnvironmentConfig(env)
			return cfg[key]
		},
	})
})

const getEnvironmentConfig = (env: string) => {
    const configs: any = {
        'production': prod,
        'development': local,
    }
	return configs[env]
}

export default config
