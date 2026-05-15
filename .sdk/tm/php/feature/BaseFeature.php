<?php
declare(strict_types=1);

// ElifeSciences SDK base feature

class ElifeSciencesBaseFeature
{
    public string $version;
    public string $name;
    public bool $active;

    public function __construct()
    {
        $this->version = '0.0.1';
        $this->name = 'base';
        $this->active = true;
    }

    public function get_version(): string { return $this->version; }
    public function get_name(): string { return $this->name; }
    public function get_active(): bool { return $this->active; }

    public function init(ElifeSciencesContext $ctx, array $options): void {}
    public function PostConstruct(ElifeSciencesContext $ctx): void {}
    public function PostConstructEntity(ElifeSciencesContext $ctx): void {}
    public function SetData(ElifeSciencesContext $ctx): void {}
    public function GetData(ElifeSciencesContext $ctx): void {}
    public function GetMatch(ElifeSciencesContext $ctx): void {}
    public function SetMatch(ElifeSciencesContext $ctx): void {}
    public function PrePoint(ElifeSciencesContext $ctx): void {}
    public function PreSpec(ElifeSciencesContext $ctx): void {}
    public function PreRequest(ElifeSciencesContext $ctx): void {}
    public function PreResponse(ElifeSciencesContext $ctx): void {}
    public function PreResult(ElifeSciencesContext $ctx): void {}
    public function PreDone(ElifeSciencesContext $ctx): void {}
    public function PreUnexpected(ElifeSciencesContext $ctx): void {}
}
