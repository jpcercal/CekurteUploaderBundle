# Exemplos

Neste momento, vamos ver a implementação dos campos de upload.

## Entity:

Na entidade você deverá definir um campo do tipo string para armazenar o path da imagem que será salva.

O trecho abaixo representa esse campo:

```php
// ...

/**
 * @var string
 *
 * @ORM\Column(name="imagem", type="string", length=255, nullable=true)
 */
private $imagem;

// ...

/**
 * Set imagem
 *
 * @param string $imagem
 * @return Post
 */
public function setImagem($imagem)
{
    $this->imagem = $imagem;

    return $this;
}

/**
 * Get imagem
 *
 * @return string
 */
public function getImagem()
{
    return $this->imagem;
}

// ...
```

## Form (Type):

```php
// Projeto nos padrões do CekurteGeneratorBundle

// ...

public function buildForm(FormBuilderInterface $builder, array $options)
{
    if ($options['search'] === true) {

        // ...

    } else {

        $builder
            // ...
            ->add('[NOME-DO-CAMPO-MAPEADO-PELO-DOCTRINE]', 'hidden', array(
                'attr'  => array(
                    'class' => '[NOME-DO-THUMBNAIL]' // Mesmo nome do endpoint
                )
            ))
            // ...
        ;
    }
}
```

## Controller:

```php
// Projeto nos padrões do CekurteGeneratorBundle

// ...

public function editAction($id)
{
    // ...

    $editForm = $this->createForm(
        // ...
    );

    // ...

    return array(
        // ...
        '[NOME-DO-THUMBNAIL]' => $editForm->get('[NOME-DO-CAMPO-MAPEADO-PELO-DOCTRINE]')->getData(),
        // ...
    );
}
```

## View:

### Criar

Para o arquivo `new.html.twig`:

```twig
{% block content -%}
    {# ... #}
    </form>

    {% include 'CekurteUploaderBundle:TwitterBootstrap3:layout.html.twig' with {
        'endpoint': '[NOME-DO-THUMBNAIL]',
        'label'   : 'Imagem'
    } %}
{% endblock %}

{%- block javascripts -%}
    {{ parent() }}

    {% include 'CekurteUploaderBundle:TwitterBootstrap3:script.html.twig' with {
        'endpoint': '[NOME-DO-THUMBNAIL]'
    } %}
{%- endblock -%}
```

### Atualizar

Para o arquivo `edit.html.twig`:

```twig
{% block content -%}
    {# ... #}
    </form>

    {% include 'CekurteUploaderBundle:TwitterBootstrap3:layout.html.twig' with {
        'endpoint': '[NOME-DO-THUMBNAIL]',
        'label'   : 'Imagem',
        'image'   : [NOME-DO-THUMBNAIL]
    } %}
{% endblock %}

{%- block javascripts -%}
    {{ parent() }}

    {% include 'CekurteUploaderBundle:TwitterBootstrap3:script.html.twig' with {
        'endpoint': '[NOME-DO-THUMBNAIL]'
    } %}
{%- endblock -%}
```

## Nota

**[NOME-DO-CAMPO-MAPEADO-PELO-DOCTRINE]** = *imagem*, ou seja, o mesmo nome definido na entidade (entity).

[Voltar para a Configuração](configuracao.md) - [Ir para o Index](index.md)