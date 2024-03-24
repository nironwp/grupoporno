import axios from 'axios';

interface GrupoInfo {
    imagem: string;
    titulo: string;
}

async function obterInfoGrupo(linkGrupo: string): Promise<GrupoInfo | {error: string}> {
    let linkTipo: string = 'whatsapp';
    let linkValido: boolean = false;

    if (/(https?:\/\/)?(www[.])?(telegram|t)\.me\/([a-zA-Z0-9\+_-]*)\/?$/i.test(linkGrupo)) {
        linkTipo = 'telegram';
        linkValido = true;
    } else {
        const matchesInviteLink = linkGrupo.match(/^https:\/\/chat\.whatsapp\.com\/invite\/([A-Za-z0-9]{22})$/);
        const matchesChatLink = linkGrupo.match(/^https:\/\/chat\.whatsapp\.com\/([A-Za-z0-9]{22})$/);
        
        if (matchesInviteLink || matchesChatLink) {
            linkValido = true;
        }
    }
    console.log(linkTipo, linkGrupo, linkValido)
    if (linkValido) {
        try {
            const response = await axios.get(linkGrupo);
            const body = response.data;

            let imageUrl: string = '';
            let groupTitle: string = '';
            console.log(response.data)
            if (linkTipo === 'telegram') {
                const imageRegex = /meta property="og:image" content="(.*?)"/;
                const titleRegex = /meta property="og:title" content="(.*?)"/;

                const imageMatch = body.match(imageRegex);
                if (imageMatch && imageMatch[1]) {
                    imageUrl = imageMatch[1];
                } else {
                    const altImageRegex = /class="tgme_page_photo_image" src="(.*?)"/;
                    const altImageMatch = body.match(altImageRegex);
                    if (altImageMatch && altImageMatch[1]) {
                        imageUrl = altImageMatch[1];
                    }
                }

                const titleMatch = body.match(titleRegex);
                if (titleMatch && titleMatch[1]) {
                    groupTitle = titleMatch[1];
                } else {
                    const altTitleRegex = /<span dir="auto">(.*?)<\/span>/;
                    const altTitleMatch = body.match(altTitleRegex);
                    if (altTitleMatch && altTitleMatch[1]) {
                        groupTitle = altTitleMatch[1];
                    }
                }
            } else {
                const imageRegex = /meta property="og:image" content="(.*?)"/;
                const titleRegex = /meta property="og:title" content="(.*?)"/;

                const imageMatch = body.match(imageRegex);
                if (imageMatch && imageMatch[1]) {
                    imageUrl = imageMatch[1];
                }

                const titleMatch = body.match(titleRegex);
                if (titleMatch && titleMatch[1]) {
                    groupTitle = titleMatch[1];
                } else {
                    const altTitleRegex = /<h2 class="(.*?)">(.*?)<\/h2><h3/;
                    const altTitleMatch = body.match(altTitleRegex);
                    if (altTitleMatch && altTitleMatch[2]) {
                        groupTitle = altTitleMatch[2];
                    }
                }
            }

            imageUrl = imageUrl.replace('&amp;oh=', '&oh=');
            imageUrl = imageUrl.replace('amp;', '');

            return { imagem: imageUrl, titulo: groupTitle };
        } catch (error) {
            return {error: 'Erro ao acessar o link do grupo.'}
        }
    } else {
        return {error: 'Envie o link do grupo no formato: https://chat.whatsapp.com/invite/8f2X03BUuObBeqB1pUsOV0'};
    }
}

export default obterInfoGrupo;
