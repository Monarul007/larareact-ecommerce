import { useForm } from '@inertiajs/react';
import { PlusIcon, XIcon } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';

interface ProductForm {
    name: string;
    slug: string;
    description: string;
    is_active: boolean;
    variations: {
        name: string;
        sku: string;
        price: string;
        stock: string;
        attributes: Record<string, string>;
    }[];
}

export default function CreateProduct() {
    const { data, setData, post, processing, errors } = useForm<ProductForm>({
        name: '',
        slug: '',
        description: '',
        is_active: true,
        variations: [
            {
                name: '',
                sku: '',
                price: '',
                stock: '',
                attributes: {},
            },
        ],
    });

    function addVariation() {
        setData('variations', [
            ...data.variations,
            {
                name: '',
                sku: '',
                price: '',
                stock: '',
                attributes: {},
            },
        ]);
    }

    function removeVariation(index: number) {
        setData(
            'variations',
            data.variations.filter((_, i) => i !== index)
        );
    }

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        post(route('products.store'));
    }

    return (
        <>
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold">Create Product</h1>
            </div>

            <form onSubmit={handleSubmit} className="mt-6 space-y-6">
                <Card>
                    <CardHeader>
                        <CardTitle>Basic Information</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="name">Name</Label>
                            <Input
                                id="name"
                                value={data.name}
                                onChange={e => setData('name', e.target.value)}
                            />
                            {errors.name && (
                                <p className="text-sm text-destructive">{errors.name}</p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="slug">Slug</Label>
                            <Input
                                id="slug"
                                value={data.slug}
                                onChange={e => setData('slug', e.target.value)}
                            />
                            {errors.slug && (
                                <p className="text-sm text-destructive">{errors.slug}</p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="description">Description</Label>
                            <Textarea
                                id="description"
                                value={data.description}
                                onChange={e => setData('description', e.target.value)}
                            />
                            {errors.description && (
                                <p className="text-sm text-destructive">
                                    {errors.description}
                                </p>
                            )}
                        </div>

                        <div className="flex items-center space-x-2">
                            <Switch
                                id="is_active"
                                checked={data.is_active}
                                onCheckedChange={checked => setData('is_active', checked)}
                            />
                            <Label htmlFor="is_active">Active</Label>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between">
                        <CardTitle>Variations</CardTitle>
                        <Button type="button" variant="outline" onClick={addVariation}>
                            <PlusIcon className="mr-2 h-4 w-4" />
                            Add Variation
                        </Button>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        {data.variations.map((variation, index) => (
                            <div
                                key={index}
                                className="relative space-y-4 rounded-lg border p-4"
                            >
                                {data.variations.length > 1 && (
                                    <Button
                                        type="button"
                                        variant="ghost"
                                        size="sm"
                                        className="absolute right-2 top-2"
                                        onClick={() => removeVariation(index)}
                                    >
                                        <XIcon className="h-4 w-4" />
                                    </Button>
                                )}

                                <div className="space-y-2">
                                    <Label htmlFor={`variations.${index}.name`}>
                                        Name
                                    </Label>
                                    <Input
                                        id={`variations.${index}.name`}
                                        value={variation.name}
                                        onChange={e =>
                                            setData('variations', [
                                                ...data.variations.slice(0, index),
                                                {
                                                    ...variation,
                                                    name: e.target.value,
                                                },
                                                ...data.variations.slice(index + 1),
                                            ])
                                        }
                                    />
                                    {errors[`variations.${index}.name`] && (
                                        <p className="text-sm text-destructive">
                                            {errors[`variations.${index}.name`]}
                                        </p>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor={`variations.${index}.sku`}>
                                        SKU
                                    </Label>
                                    <Input
                                        id={`variations.${index}.sku`}
                                        value={variation.sku}
                                        onChange={e =>
                                            setData('variations', [
                                                ...data.variations.slice(0, index),
                                                {
                                                    ...variation,
                                                    sku: e.target.value,
                                                },
                                                ...data.variations.slice(index + 1),
                                            ])
                                        }
                                    />
                                    {errors[`variations.${index}.sku`] && (
                                        <p className="text-sm text-destructive">
                                            {errors[`variations.${index}.sku`]}
                                        </p>
                                    )}
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor={`variations.${index}.price`}>
                                            Price
                                        </Label>
                                        <Input
                                            id={`variations.${index}.price`}
                                            type="number"
                                            min="0"
                                            step="0.01"
                                            value={variation.price}
                                            onChange={e =>
                                                setData('variations', [
                                                    ...data.variations.slice(0, index),
                                                    {
                                                        ...variation,
                                                        price: e.target.value,
                                                    },
                                                    ...data.variations.slice(index + 1),
                                                ])
                                            }
                                        />
                                        {errors[`variations.${index}.price`] && (
                                            <p className="text-sm text-destructive">
                                                {errors[`variations.${index}.price`]}
                                            </p>
                                        )}
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor={`variations.${index}.stock`}>
                                            Stock
                                        </Label>
                                        <Input
                                            id={`variations.${index}.stock`}
                                            type="number"
                                            min="0"
                                            value={variation.stock}
                                            onChange={e =>
                                                setData('variations', [
                                                    ...data.variations.slice(0, index),
                                                    {
                                                        ...variation,
                                                        stock: e.target.value,
                                                    },
                                                    ...data.variations.slice(index + 1),
                                                ])
                                            }
                                        />
                                        {errors[`variations.${index}.stock`] && (
                                            <p className="text-sm text-destructive">
                                                {errors[`variations.${index}.stock`]}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </CardContent>
                </Card>

                <div className="flex justify-end">
                    <Button type="submit" disabled={processing}>
                        {processing ? 'Creating...' : 'Create Product'}
                    </Button>
                </div>
            </form>
        </>
    );
}