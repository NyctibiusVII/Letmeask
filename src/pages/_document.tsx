import Document, { Html, Head, Main, NextScript } from 'next/document'

export default class MyDocument extends Document {
    render() {
        const
            ptBR  = "pt-BR",
            title = "Letmeask",
            site  = "Letmeask",
            link  = "https://letmeask-nyctibiusvii.vercel.app/",
            NyctibiusVII = "Matheus Vidigal - (NyctibiusVII)",
            NyctibiusVII_twitter = "@NyctibiusVII",
            description = "Me faça uma pergunta!",
            keywords    = "nodejs, css, html, typescript, reactjs, nextjs, discovery, letmeask, projeto, contexts, rocketseat, vercel, nextlevelweek, diegofernandes, nlw6, together, trilha-react, perguntas, firebase"

        return (
            <Html lang="pt-BR">
                <Head>
                    <meta charSet="utf-8" />
                    <meta name="language" content="pt-BR" />

                    <meta name="robots"       content="all" />
                    <meta name="rating"       content="general" />
                    <meta name="distribution" content="global" />
                    <meta name="description"  content="Me faça uma pergunta!" />

                    <meta name="author"   content={ NyctibiusVII } />
                    <meta name="creator"  content={ NyctibiusVII } />
                    <meta name="keywords" content={ keywords } />

                    <meta httpEquiv="content-type"     content="text/html; charset=UTF-8" />
                    <meta httpEquiv="content-language" content={ ptBR } />
                    <meta httpEquiv="X-UA-Compatible"  content="ie=edge" />

                    <meta property="og:title"       content={ title } />
                    <meta property="og:site_name"   content={ site } />
                    <meta property="og:description" content={ description } />
                    <meta property="og:image"  content="" />
                    <meta property="og:type"   content="page" />
                    <meta property="og:url"    content={ link } />
                    <meta property="og:locale" content={ ptBR } />

                    <meta property="article:author" content={ NyctibiusVII } />

                    <meta name="twitter:title" content={ title } />
                    <meta name="twitter:site"  content={ site } />
                    <meta name="twitter:creator"     content={ NyctibiusVII_twitter } />
                    <meta name="twitter:description" content={ description } />
                    <meta name="twitter:card"        content="summary_large_image" />

                    <link rel="shortcut icon" href="/favicon.svg" type="image/svg" />
                </Head>
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        )
    }
}