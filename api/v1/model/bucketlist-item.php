<?php

class BucketlistItem implements JsonSerializable
{
    private $id;
    private $title;
    private $description;
    private $image;
    private $completed = false;
    private $info = "";

    public function __construct($data)
    {
        if (isset($data['id']))
            $this->setId($data['id']);
        if (isset($data['title']))
            $this->setTitle($data['title']);
        if (isset($data['description']))
            $this->setDescription($data['description']);
        if (isset($data['image']))
            $this->setImage($data['image']);
        if (isset($data['completed']))
            if($data['completed'] == 0 || $data['completed'] == 1){
                $this->setCompletedAsInteger($data['completed']);
            } else {
                $this->setCompleted($data['completed']);
            }
        if (isset($data['info']))
            $this->setInfo($data['info']);
    }

    /**
     * @return mixed
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * @param mixed $id
     */
    public function setId($id)
    {
        $this->id = $id;
    }

    /**
     * @return mixed
     */
    public function getTitle()
    {
        return $this->title;
    }

    /**
     * @param mixed $title
     */
    public function setTitle($title)
    {
        $this->title = $title;
    }

    /**
     * @return mixed
     */
    public function getDescription()
    {
        return $this->description;
    }

    /**
     * @param mixed $description
     */
    public function setDescription($description)
    {
        $this->description = $description;
    }

    /**
     * @return mixed
     */
    public function getImage()
    {
        return $this->image;
    }

    /**
     * @param mixed $image
     */
    public function setImage($image)
    {
        $this->image = $image;
    }

    /**
     * @return mixed
     */
    public function getCompleted()
    {
        return $this->completed;
    }

    /**
     * @param mixed $completed
     */
    public function setCompleted($completed)
    {
        $this->completed = $completed;
    }

    /**
     * @return mixed
     */
    public function getCompletedAsInteger()
    {
        return $this->completed ? 1 : 0;
    }

    /**
     * @param mixed $completed
     */
    public function setCompletedAsInteger($completed)
    {
        $this->completed = $completed == 1;
    }

    /**
     * @return mixed
     */
    public function getInfo()
    {
        return $this->info;
    }

    /**
     * @param mixed $info
     */
    public function setInfo($info)
    {
        $this->info = $info;
    }

    public function jsonSerialize()
    {
        return get_object_vars($this);
    }

    public function isValid()
    {
        if (
            $this->title != null &&
            $this->description != null &&
            $this->image != null
        ) {
            return true;
        }
        return false;
    }
}