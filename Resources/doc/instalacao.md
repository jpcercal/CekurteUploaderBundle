# Instalação

Assumimos que você já tenha o binário do composer instalado ou o arquivo composer.phar, sendo assim, execute o seguinte comando:

```bash
$ composer require cekurte/uploaderbundle
```

Agora adicione o Bundle no seu Kernel:

```php
<?php
// app/AppKernel.php

public function registerBundles()
{
    // ...
    new FOS\JsRoutingBundle\FOSJsRoutingBundle(),
    new Liip\ImagineBundle\LiipImagineBundle(),
    new Oneup\UploaderBundle\OneupUploaderBundle(),
    new Cekurte\UploaderBundle\CekurteUploaderBundle(),
    // ...
}
```

[Voltar para o Index](index.md) - [Ver a Configuração](configuracao.md)