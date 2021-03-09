<?php

namespace App\Entity;

use App\Repository\CyclingShirtRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\HttpFoundation\File\File;
use Vich\UploaderBundle\Mapping\Annotation as Vich;
use DateTime;

/**
 * @ORM\Entity(repositoryClass=CyclingShirtRepository::class)
 * @Vich\Uploadable
 */
class CyclingShirt
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     */
    private int $id;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    private ?string $picture = "";

    /**
     * @Vich\UploadableField(mapping="cycling_shirt_picture", fileNameProperty="picture")
     */
    private ?File $cyclingShirtPicture = null;

    /**
     * @ORM\Column(type="datetime", nullable=true)
     */
    private DateTime $updatedAt;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private string $name;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    private ?string $cyclistName;

    /**
     * @ORM\Column(type="text", nullable=true)
     */
    private string $teamInformations;

    /**
     * @ORM\Column(type="text", nullable=true)
     */
    private string $results;

    /**
     * @ORM\OneToMany(targetEntity=Favorite::class, mappedBy="cyclingShirt")
     */
    private collection $favorites;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private string $years;

    public function __construct()
    {
        $this->favorites = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getPicture(): ?string
    {
        return $this->picture;
    }

    public function setPicture(?string $picture): self
    {
        $this->picture = $picture;

        return $this;
    }

    public function getCyclingShirtPicture(): ?File
    {
        return $this->cyclingShirtPicture;
    }

    public function setCyclingShirtPicture(File $cyclingShirtPicture = null): self
    {
        $this->cyclingShirtPicture = $cyclingShirtPicture;
        if ($cyclingShirtPicture) {
            $this->updatedAt = new DateTime('now');
        }
        return $this;
    }

    /**
     * @return mixed
     */
    public function getUpdatedAt()
    {
        return $this->updatedAt;
    }

    /**
     * @param mixed $updatedAt
     */
    public function setUpdatedAt($updatedAt): void
    {
        $this->updatedAt = $updatedAt;
    }

    public function getName(): ?string
    {
        return $this->name;
    }

    public function setName(string $name): self
    {
        $this->name = $name;

        return $this;
    }

    public function getCyclistName(): ?string
    {
        return $this->cyclistName;
    }

    public function setCyclistName(string $cyclistName): self
    {
        $this->cyclistName = $cyclistName;

        return $this;
    }

    public function getTeamInformations(): ?string
    {
        return $this->teamInformations;
    }

    public function setTeamInformations(string $teamInformations): self
    {
        $this->teamInformations = $teamInformations;

        return $this;
    }

    public function getResults(): ?string
    {
        return $this->results;
    }

    public function setResults(string $results): self
    {
        $this->results = $results;

        return $this;
    }

    /**
     * @return Collection|Favorite[]
     */
    public function getFavorites(): Collection
    {
        return $this->favorites;
    }

    public function addFavorite(Favorite $favorite): self
    {
        if (!$this->favorites->contains($favorite)) {
            $this->favorites[] = $favorite;
            $favorite->setCyclingShirt($this);
        }

        return $this;
    }

    public function removeFavorite(Favorite $favorite): self
    {
        if ($this->favorites->removeElement($favorite)) {
            // set the owning side to null (unless already changed)
            if ($favorite->getCyclingShirt() === $this) {
                $favorite->setCyclingShirt(null);
            }
        }

        return $this;
    }

    public function getYears(): ?string
    {
        return $this->years;
    }

    public function setYears(string $years): self
    {
        $this->years = $years;

        return $this;
    }
}
