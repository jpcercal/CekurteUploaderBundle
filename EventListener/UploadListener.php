<?php

namespace Cekurte\UploaderBundle\EventListener;

use Oneup\UploaderBundle\Event\PostPersistEvent;
use Symfony\Component\DependencyInjection\ContainerInterface;

/**
 * UploadListener
 */
class UploadListener
{
    /**
     * @var ContainerInterface
     */
    protected $container;

    /**
     * @param ContainerInterface
     */
    public function __construct(ContainerInterface $container)
    {
        $this->container = $container;
    }

    /**
     * @return ContainerInterface
     */
    protected function getContainer()
    {
        return $this->container;
    }

    /**
     * @param PostPersistEvent
     */
    public function onUpload(PostPersistEvent $event)
    {
        $file     = $event->getFile();
        $response = $event->getResponse();

        $response['mapping']    = $event->getType();
        $response['path']       = sprintf('uploads/%s', $event->getType());
        $response['filename']   = $file->getFilename();
    }
}
