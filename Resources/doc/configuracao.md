# Configuração

## Routing

No seu arquivo de configuração de rotas `app/config/routing.yml` adicione a seguinte entrada:

```yml
# app/config/routing.yml

# ...
# ------------------------------------------------------------------------------
# CekurteUploaderBundle

_imagine:
    resource:   .
    type:       imagine

oneup_uploader:
    resource:   .
    type:       uploader

cekurte_uploader:
    resource:   "@CekurteUploaderBundle/Controller/"
    type:       annotation
    prefix:     /uploader/

# ------------------------------------------------------------------------------
# FOSJsRoutingBundle

fos_js_routing:
    resource:   "@FOSJsRoutingBundle/Resources/config/routing/routing.xml"
# ...
```

## FOSJsRoutingBundle

No seu arquivo de configuração `app/config/config.yml` adicione a seguinte entrada:

```yml
# app/config/config.yml

# ...
fos_js_routing:
    routes_to_expose:
        - cekurte_ajax_liipimagine_uploader
```

## LiipImagineBundle

Ainda no seu arquivo de configuração `app/config/config.yml` adicione a seguinte entrada:

```yml
# app/config/config.yml

# ...
liip_imagine:
    driver:                 gd
    web_root:               %kernel.root_dir%/../web
    cache_prefix:           /media/cache
    data_loader:            filesystem
    cache_mkdir_mode:       0777
    controller_action:      liip_imagine.controller:filterAction
    filter_sets:
        admin_thumbnail_list:
            quality:              60
            filters:
                thumbnail: { size: [48, 48], mode: outbound }

        # ...
        [NOME-DO-THUMBNAIL]_thumbnail:
            quality:              75
            filters:
                thumbnail: { size: [100, 100], mode: outbound }
```

Substitua **[NOME-DO-THUMBNAIL]** por um identificador que corresponda ao thumbnail que você irá gerar.

Para as configurações deste thumbnail você poderá informar:

- **quality**: Define a qualidade da imagem que será renderizada
- **size**: Define o tamanho da imagem que será renderizada

### Notas:

**[NOME-DO-THUMBNAIL]** deverá ser uma string em caixa baixa. Exemplo: *autor*

## OneupUploaderBundle

Por fim, no seu arquivo de configuração `app/config/config.yml` adicione a seguinte entrada:

```yml
# app/config/config.yml

# ...
oneup_uploader:
    mappings:
        [NOME-DO-THUMBNAIL]:
            frontend:               blueimp
            max_size:               2097152     # 2 MB (1024 * 1024 * 2)
            allowed_mimetypes:      ["image/jpg", "image/jpeg", "image/png", "image/gif"]
```

Substitua **[NOME-DO-THUMBNAIL]** pelo mesmo identificador que você definiu no passo anterior.

Para as configurações deste mapeamento você poderá informar:

- **max_size**: O tamanho máximo do arquivo que poderá ser enviado
- **allowed_mimetypes**: Os mimetypes dos arquivos que serão aceitos (você deverá informar sempre imagens)

## Observação

Para cada novo campo de upload você deverá adicionar uma entrada no arquivo `app/config/config.yml` contendo:
para o *LiipImagineBundle* um **filter_set** com o sufixo **_thumbnail** e um **mappings** para o *OneupUploaderBundle* com o mesmo
**[NOME-DO-THUMBNAIL]** que fora definido no *LiipImagineBundle*.

[Voltar para a Instalação](instalacao.md) - [Ver os Exemplos](exemplos.md)