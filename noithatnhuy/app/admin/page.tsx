"use client";
import { useState, useEffect } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  PlusIcon,
  EditIcon,
  TrashIcon,
  FolderPlusIcon,
  FolderMinusIcon,
} from "@/components/ui/icon";

import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { toast } from "sonner";
import axios from "axios";

interface ProductType {
  id: number;
  productName: string;
  image: string;
  categoryId: number;
  hot: boolean;
  amount: number;
  amountSale: number;
  description: string;
}

interface CategoryType {
  id: number;
  name: string;
}

export default function AdminPage() {
  const [products, setProducts] = useState<ProductType[]>([]);
  const [categories, setCategories] = useState<CategoryType[]>([]);

  // Form data cho Add Product
  const [productName, setProductName] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [categoryId, setCategoryId] = useState<number>(0);
  const [hot, setHot] = useState<boolean>(false);
  const [amount, setAmount] = useState<number>(0);
  // const [saleFlg, setSaleFlg] = useState<number>(0);
  const [amountSale, setAmountSale] = useState<number>(0);
  const [description, setDescription] = useState("");

  // Form data cho Edit Product
  const [editingProductId, setEditingProductId] = useState<number | null>(null);
  const [editProductName, setEditProductName] = useState("");
  const [editImage, setEditImage] = useState<File | null>(null);
  const [editCategoryId, setEditCategoryId] = useState<number>(0);
  const [editHot, setEditHot] = useState<boolean>(false);
  const [editAmount, setEditAmount] = useState<number>(0);
  const [editSaleFlg, setEditSaleFlg] = useState<number>(0);
  const [editAmountSale, setEditAmountSale] = useState<number>(0);
  const [editDescription, setEditDescription] = useState("");

  // Form data cho Edit Category
  const [editingCategoryId, setEditingCategoryId] = useState<number | null>(
    null
  );
  const [editCategoryName, setEditCategoryName] = useState("");
  const [editCategoryImage, setEditCategoryImage] = useState<File | null>(null);

  // Form data cho Add Category
  const [newCategoryName, setNewCategoryName] = useState("");
  const [imageCategory, setImageCategory] = useState<File | null>(null);

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await axios.get("http://localhost:8080/api/products");
      setProducts(res.data);
    } catch (error) {
      toast.error("Thiếu thông tin", {
        description: "Vui lòng điền đầy đủ các trường bắt buộc",
      });
    }
  };

  const fetchCategories = async () => {
    try {
      const res = await axios.get("http://localhost:8080/api/categories");
      setCategories(res.data);
    } catch (error) {
      toast.error("Lỗi", {
        description: "Không thể tải danh sách danh mục",
      });
    }
  };

  const handleAddProduct = async () => {
    try {
      if (!productName.trim()) {
        toast.error("Vui lòng nhập tên sản phẩm");
        return;
      }

      if (!image) {
        toast.error("Vui lòng chọn ảnh");
        return;
      }

      if (!categoryId) {
        toast.error("Vui lòng chọn danh mục");
        return;
      }

      if (hot === null) {
        toast.error("Vui lòng chọn sản phẩm bán chạy");
        return;
      }

      if (!description.trim()) {
        toast.error("Vui lòng nhập chi tiết sản phẩm");
        return;
      }

      const formData = new FormData();
      formData.append("productName", productName);
      formData.append("image", image); // ảnh dạng file
      formData.append("categoryId", categoryId.toString());
      formData.append("hot", hot ? "true" : "false");
      formData.append("amount", amount.toString());
      // formData.append("saleFlg", saleFlg.toString());
      formData.append("amountSale", amountSale.toString());
      formData.append("description", description);

      await axios.post("http://localhost:8080/api/products", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      fetchProducts();

      // Reset form
      setProductName("");
      setImage(null);
      setCategoryId(0);
      setHot(false);
      setAmount(0);
      // setSaleFlg(0);
      setAmountSale(0);
      setDescription("");

      toast.success("Thành công", {
        description: "Sản phẩm đã được thêm",
      });
    } catch (error) {
      toast.error("Lỗi", {
        description: "Không thể thêm sản phẩm",
      });
    }
  };

  // Prepare edit product form
  const prepareEditProduct = (product: ProductType) => {
    setEditingProductId(product.id);
    setEditProductName(product.productName);
    setEditImage(null); // reset ảnh khi vào edit
    setEditCategoryId(product.categoryId);
    setEditHot(product.hot);
    setEditAmount(product.amount);
    // setEditSaleFlg(product.saleFlg);
    setEditAmountSale(product.amountSale);
    setEditDescription(product.description);
  };

  // Edit Product
  const handleEditProduct = async () => {
    if (!editingProductId) return;
    if (!editProductName.trim()) {
      toast.error("Vui lòng nhập tên sản phẩm");
      return;
    }

    if (!editCategoryId) {
      toast.error("Vui lòng chọn danh mục");
      return;
    }

    if (editHot === null) {
      toast.error("Vui lòng chọn sản phẩm bán chạy");
      return;
    }

    if (!editDescription.trim()) {
      toast.error("Vui lòng nhập chi tiết sản phẩm");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("productName", editProductName);
      formData.append("categoryId", editCategoryId.toString());
      formData.append("hot", editHot.toString());
      formData.append("amount", editAmount.toString());
      formData.append("saleFlg", editSaleFlg.toString());
      formData.append("amountSale", editAmountSale.toString());
      formData.append("description", editDescription);

      // Nếu user có upload ảnh mới thì append
      if (editImage) {
        formData.append("image", editImage);
      }

      await axios.put(
        `http://localhost:8080/api/products/${editingProductId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      fetchProducts();

      toast.success("Thành công", {
        description: "Sản phẩm đã được cập nhật",
      });
    } catch (error) {
      toast.error("Lỗi", {
        description: "Không thể cập nhật sản phẩm",
      });
    }
  };

  // Delete Product
  const handleDeleteProduct = async (id: number) => {
    try {
      await axios.delete(`http://localhost:8080/api/products/${id}`);
      fetchProducts();

      toast.success("Thành công", {
        description: "Sản phẩm đã được xóa",
      });
    } catch (error) {
      toast.error("Lỗi", {
        description: "Không thể xóa sản phẩm",
      });
    }
  };

  // Add Category
  const handleAddCategory = async () => {
    try {
      if (!newCategoryName.trim()) {
        toast.error("Vui lòng nhập tên danh mục");
        return;
      }

      if (!imageCategory) {
        toast.error("Vui lòng chọn ảnh");
        return;
      }
      const formData = new FormData();
      formData.append("name", newCategoryName);
      formData.append("image", imageCategory);

      await axios.post("http://localhost:8080/api/categories", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      fetchCategories();
      setNewCategoryName("");
      setImageCategory(null);

      toast.success("Thành công", {
        description: "Danh mục đã được thêm thành công",
      });
    } catch (error) {
      toast.error("Lỗi", {
        description: "Không thể thêm danh mục",
      });
    }
  };

  // Prepare edit category
  const prepareEditCategory = (category: CategoryType) => {
    setEditingCategoryId(category.id);
    setEditCategoryImage(null);
    setEditCategoryName(category.name);
  };

  // Edit Category
  const handleEditCategory = async () => {
    if (!editingCategoryId) return;

    const formData = new FormData();
    formData.append("name", editCategoryName);
    if (editCategoryImage) {
      formData.append("image", editCategoryImage); // `editCategoryImage` là File
    }

    try {
      await axios.put(
        `http://localhost:8080/api/categories/${editingCategoryId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      fetchCategories();
      setEditingCategoryId(null);
      setEditCategoryName("");
      setEditCategoryImage(null); // reset ảnh

      toast.success("Thành công", {
        description: "Danh mục đã được cập nhật",
      });
    } catch (error) {
      toast.error("Lỗi", {
        description: "Không thể cập nhật danh mục",
      });
    }
  };

  // Delete Category
  const handleDeleteCategory = async (id: number) => {
    try {
      await axios.delete(`http://localhost:8080/api/categories/${id}`);
      fetchCategories();

      toast.success("Thành công", {
        description: "Danh mục đã được xóa",
      });
    } catch (error) {
      toast.error("Lỗi", {
        description: "Không thể xóa danh mục",
      });
    }
  };
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // Check login từ localStorage
  useEffect(() => {
    const isLoginLocal = localStorage.getItem("isAdminLogin");
    if (isLoginLocal === "true") {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === "adminhuy") {
      setIsLoggedIn(true);
      localStorage.setItem("isAdminLogin", "true");
      setError("");
      toast.success("Đăng nhập thành công!");
    } else {
      setError("Sai mật khẩu. Vui lòng thử lại!");
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem("isAdminLogin");
    toast.success("Đã đăng xuất!");
  };

  if (!isLoggedIn) {
    return (
      <div className="max-w-sm mx-auto mt-20 p-4 border rounded shadow">
        <h2 className="text-xl font-semibold mb-4">Đăng nhập Admin</h2>
        <form onSubmit={handleLogin}>
          <Input
            type="password"
            placeholder="Nhập password..."
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
          <Button type="submit" className="mt-4 w-full">
            Đăng Nhập
          </Button>
        </form>
      </div>
    );
  }
  const formatCurrency = (value: number): string => {
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  return (
    <div className="max-w-4xl mx-auto py-10 px-4">
      <div className="flex justify-end p-4">
        <Button variant="outline" onClick={handleLogout}>
          Đăng xuất
        </Button>
      </div>
      <h1 className="text-3xl font-bold mb-6 text-center">Trang Admin</h1>
      <Tabs defaultValue="add-product" className="w-full">
        <TabsList className="grid grid-cols-2 md:grid-cols-3 gap-3 p-2 bg-gray-50 rounded-lg border border-gray-200 shadow-sm">
          {/* Product Tabs */}
          <TabsTrigger
            value="add-product"
            className="px-4 py-3 text-sm md:text-base font-medium hover:bg-gray-100 transition-colors data-[state=active]:bg-white data-[state=active]:shadow data-[state=active]:border data-[state=active]:border-gray-200"
          >
            <div className="flex items-center justify-center gap-2">
              <PlusIcon className="w-4 h-4 text-blue-500" />
              <span>Thêm SP</span>
            </div>
          </TabsTrigger>

          <TabsTrigger
            value="edit-product"
            className="px-4 py-3 text-sm md:text-base font-medium hover:bg-gray-100 transition-colors data-[state=active]:bg-white data-[state=active]:shadow data-[state=active]:border data-[state=active]:border-gray-200"
          >
            <div className="flex items-center justify-center gap-2">
              <FolderMinusIcon className="w-4 h-4 text-yellow-500" />
              <span>Sửa SP</span>
            </div>
          </TabsTrigger>

          <TabsTrigger
            value="delete-product"
            className="px-4 py-3 text-sm md:text-base font-medium hover:bg-gray-100 transition-colors data-[state=active]:bg-white data-[state=active]:shadow data-[state=active]:border data-[state=active]:border-gray-200"
          >
            <div className="flex items-center justify-center gap-2">
              <TrashIcon className="w-4 h-4 text-red-500" />
              <span>Xóa SP</span>
            </div>
          </TabsTrigger>

          {/* Category Tabs */}
          <TabsTrigger
            value="add-category"
            className="px-4 py-3 text-sm md:text-base font-medium hover:bg-gray-100 transition-colors data-[state=active]:bg-white data-[state=active]:shadow data-[state=active]:border data-[state=active]:border-gray-200"
          >
            <div className="flex items-center justify-center gap-2">
              <FolderPlusIcon className="w-4 h-4 text-green-500" />
              <span>Thêm DM</span>
            </div>
          </TabsTrigger>

          <TabsTrigger
            value="edit-category"
            className="px-4 py-3 text-sm md:text-base font-medium hover:bg-gray-100 transition-colors data-[state=active]:bg-white data-[state=active]:shadow data-[state=active]:border data-[state=active]:border-gray-200"
          >
            <div className="flex items-center justify-center gap-2">
              <FolderMinusIcon className="w-4 h-4 text-purple-500" />
              <span>Sửa DM</span>
            </div>
          </TabsTrigger>

          <TabsTrigger
            value="delete-category"
            className="px-4 py-3 text-sm md:text-base font-medium hover:bg-gray-100 transition-colors data-[state=active]:bg-white data-[state=active]:shadow data-[state=active]:border data-[state=active]:border-gray-200"
          >
            <div className="flex items-center justify-center gap-2">
              <TrashIcon className="w-4 h-4 text-rose-500" />
              <span>Xóa DM</span>
            </div>
          </TabsTrigger>
        </TabsList>
        <div className="mt-40 md:mt-20" />

        {/* Add Product */}
        <TabsContent value="add-product" className="mt-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Hàng 1 - Cột 1: Tên sản phẩm */}
            <div className="space-y-2">
              <Label htmlFor="productName">
                Tên sản phẩm: <span className="text-red-500">*</span>
              </Label>
              <Input
                id="productName"
                placeholder="Nhập tên sản phẩm"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
              />
            </div>

            {/* Hàng 1 - Cột 2: Link ảnh */}
            <div className="space-y-2">
              <Label htmlFor="image">
                Ảnh sản phẩm: <span className="text-red-500">*</span>
              </Label>
              <Input
                id="image"
                type="file"
                accept="image/*"
                onChange={(e) => setImage(e.target.files?.[0] || null)}
              />
            </div>

            {/* Hàng 2 - Cột 1: Danh mục */}
            <div className="space-y-2">
              <Label htmlFor="category">
                Chọn danh mục: <span className="text-red-500">*</span>
              </Label>
              <Select
                value={categoryId.toString()}
                onValueChange={(value) => setCategoryId(Number(value))}
              >
                <SelectTrigger id="category">
                  <SelectValue placeholder="Chọn Category" />
                </SelectTrigger>
                <SelectContent className="z-50">
                  {categories.map((cat) => (
                    <SelectItem key={cat.id} value={String(cat.id)}>
                      {cat.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Hàng 2 - Cột 2: Sản phẩm bán chạy */}
            <div className="space-y-2">
              <Label htmlFor="hot">
                Sản phẩm bán chạy: <span className="text-red-500">*</span>
              </Label>
              <Select
                value={hot ? "yes" : "no"}
                onValueChange={(value) => setHot(value === "yes")}
              >
                <SelectTrigger id="hot">
                  <SelectValue placeholder="Hot" />
                </SelectTrigger>
                <SelectContent className="z-50">
                  <SelectItem value="yes">Có</SelectItem>
                  <SelectItem value="no">Không</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="amount">
                Giá gốc: <span className="text-red-500">*</span>
              </Label>
              <div className="relative">
                <Input
                  id="amount"
                  type="text"
                  placeholder="Nhập giá gốc"
                  value={amount === 0 ? "" : formatCurrency(amount)}
                  onChange={(e) => {
                    const rawValue = e.target.value.replace(/[^0-9]/g, "");
                    setAmount(rawValue === "" ? 0 : Number(rawValue));
                  }}
                  onBlur={() => {
                    if (amount < 0) setAmount(0);
                  }}
                  className="pr-8" /* Tạo khoảng trống cho đơn vị tiền tệ */
                />
                <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                  VNĐ
                </span>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="amountSale">
                Giá đã giảm: <span className="text-red-500">*</span>
              </Label>
              <div className="relative">
                <Input
                  id="amountSale"
                  type="text"
                  placeholder="Nhập giá đã giảm"
                  value={amountSale === 0 ? "" : formatCurrency(amountSale)}
                  onChange={(e) => {
                    const rawValue = e.target.value.replace(/[^0-9]/g, "");
                    const numericValue = rawValue === "" ? 0 : Number(rawValue);

                    // Tự động kiểm tra không vượt quá giá gốc
                    if (amount > 0 && numericValue > amount) {
                      setAmountSale(amount);
                    } else {
                      setAmountSale(numericValue);
                    }
                  }}
                  onBlur={() => {
                    // Validation khi rời khỏi ô input
                    if (amountSale < 0) setAmountSale(0);
                    if (amount > 0 && amountSale > amount)
                      setAmountSale(amount);
                  }}
                  className="pr-8" /* Tạo khoảng trống cho VNĐ */
                />
                <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                  VNĐ
                </span>
              </div>

              {/* Hiển thị cảnh báo nếu giá không hợp lệ */}
              {amount > 0 && amountSale > amount && (
                <p className="text-sm text-red-500">
                  ⚠️ Giá giảm không được lớn hơn giá gốc (
                  {formatCurrency(amount)} VNĐ)
                </p>
              )}
            </div>

            {/* Hàng 4 - Cột 2: Chi tiết sản phẩm */}
            <div className="space-y-2">
              <Label htmlFor="description">
                Chi tiết sản phẩm: <span className="text-red-500">*</span>
              </Label>
              <Input
                id="description"
                placeholder="Nhập mô tả"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
          </div>

          {/* Nút Thêm sản phẩm - Chiếm full width */}
          <div className="mt-6 col-span-full">
            <Button onClick={handleAddProduct} className="w-full md:w-auto">
              Thêm sản phẩm
            </Button>
          </div>
        </TabsContent>

        {/* Edit Product */}
        <TabsContent value="edit-product" className="mt-5">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Cột 1: Danh sách sản phẩm */}
            <div className="space-y-4">
              <h3 className="font-semibold text-lg">Danh sách sản phẩm</h3>
              <div className="space-y-3 max-h-[600px] overflow-y-auto">
                {products.map((product) => (
                  <div
                    key={product.id}
                    className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                      editingProductId === product.id
                        ? "bg-blue-50 border-blue-500"
                        : "hover:bg-gray-50"
                    }`}
                    onClick={() => prepareEditProduct(product)}
                  >
                    Tên Sản phẩm
                    <div className="font-medium">{product.productName}</div>
                    <div className="text-sm text-gray-500">
                      Giá thành: {product.amount.toLocaleString()} VNĐ
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Cột 2: Form chỉnh sửa */}
            {editingProductId && (
              <div className="space-y-4 p-5 border rounded-lg bg-white shadow-sm">
                <h3 className="font-semibold text-lg">Chỉnh sửa sản phẩm</h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Tên sản phẩm */}
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="editProductName">
                      Tên sản phẩm: <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="editProductName"
                      placeholder="Nhập tên sản phẩm"
                      value={editProductName}
                      onChange={(e) => setEditProductName(e.target.value)}
                    />
                  </div>

                  {/* Upload Ảnh */}
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="editImage">
                      Ảnh sản phẩm: <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="editImage"
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        if (e.target.files && e.target.files[0]) {
                          setEditImage(e.target.files[0]);
                        }
                      }}
                    />
                  </div>

                  {/* Danh mục */}
                  <div className="space-y-2">
                    <Label htmlFor="editCategory">
                      Danh mục: <span className="text-red-500">*</span>
                    </Label>
                    <Select
                      value={editCategoryId.toString()}
                      onValueChange={(value) =>
                        setEditCategoryId(Number(value))
                      }
                    >
                      <SelectTrigger id="editCategory">
                        <SelectValue placeholder="Chọn danh mục" />
                      </SelectTrigger>
                      <SelectContent className="z-50">
                        {categories.map((cat) => (
                          <SelectItem key={cat.id} value={String(cat.id)}>
                            {cat.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Sản phẩm bán chạy */}
                  <div className="space-y-2">
                    <Label htmlFor="editHot">
                      Bán chạy: <span className="text-red-500">*</span>
                    </Label>
                    <Select
                      value={editHot ? "yes" : "no"}
                      onValueChange={(value) => setEditHot(value === "yes")}
                    >
                      <SelectTrigger id="editHot">
                        <SelectValue placeholder="Chọn trạng thái" />
                      </SelectTrigger>
                      <SelectContent className="z-50">
                        <SelectItem value="yes">Có</SelectItem>
                        <SelectItem value="no">Không</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="editAmount">
                      Giá gốc: <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="editAmount"
                      type="text"
                      placeholder="Nhập giá gốc"
                      value={editAmount === 0 ? "" : formatCurrency(editAmount)}
                      onChange={(e) => {
                        // Lấy giá trị số từ chuỗi đã định dạng
                        const rawValue = e.target.value.replace(/[^0-9]/g, "");
                        setEditAmount(rawValue === "" ? 0 : Number(rawValue));
                      }}
                      onBlur={() => {
                        // Đảm bảo giá trị không âm
                        if (editAmount < 0) setEditAmount(0);
                      }}
                    />
                  </div>

                  {/* Giá đã giảm */}
                  <div className="space-y-2">
                    <Label htmlFor="editAmountSale">
                      Giá sau giảm: <span className="text-red-500">*</span>
                    </Label>
                    <div className="relative">
                      <Input
                        id="editAmountSale"
                        type="text"
                        placeholder="Nhập giá sau giảm"
                        value={
                          editAmountSale === 0
                            ? ""
                            : formatCurrency(editAmountSale)
                        }
                        onChange={(e) => {
                          const rawValue = e.target.value.replace(
                            /[^0-9]/g,
                            ""
                          );
                          const numericValue =
                            rawValue === "" ? 0 : Number(rawValue);

                          // Tự động kiểm tra real-time
                          if (editAmount > 0 && numericValue > editAmount) {
                            setEditAmountSale(editAmount);
                          } else {
                            setEditAmountSale(numericValue);
                          }
                        }}
                        onBlur={() => {
                          // Validation khi rời khỏi ô input
                          if (editAmountSale < 0) setEditAmountSale(0);
                          if (editAmount > 0 && editAmountSale > editAmount) {
                            setEditAmountSale(editAmount);
                          }
                        }}
                        className={`pr-8 ${
                          editAmount === 0
                            ? "bg-gray-100 cursor-not-allowed"
                            : ""
                        }`}
                        disabled={editAmount === 0}
                      />
                      <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                        VNĐ
                      </span>
                    </div>

                    {/* Hiển thị cảnh báo */}
                    {editAmount === 0 ? (
                      <p className="text-sm text-amber-600">
                        ⚠️ Vui lòng nhập <strong>giá gốc</strong> trước
                      </p>
                    ) : editAmountSale > editAmount ? (
                      <p className="text-sm text-red-500">
                        ⚠️ Giá giảm không được vượt quá{" "}
                        {formatCurrency(editAmount)} VNĐ
                      </p>
                    ) : null}
                  </div>

                  {/* Mô tả */}
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="editDescription">
                      Chi tiết sản phẩm: <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="editDescription"
                      placeholder="Nhập mô tả"
                      value={editDescription}
                      onChange={(e) => setEditDescription(e.target.value)}
                    />
                  </div>
                </div>

                <div className="pt-4">
                  <Button
                    onClick={handleEditProduct}
                    className="w-full md:w-auto"
                  >
                    Cập nhật sản phẩm
                  </Button>
                </div>
              </div>
            )}
          </div>
        </TabsContent>

        {/* Delete Product */}
        <TabsContent value="delete-product" className="space-y-3 mt-5">
          <div className="space-y-2">
            {products.map((product) => (
              <div
                key={product.id}
                className="flex justify-between items-center p-3 border rounded"
              >
                <div>{product.productName}</div>
                <Button
                  variant="destructive"
                  onClick={() => handleDeleteProduct(product.id)}
                >
                  Xóa
                </Button>
              </div>
            ))}
          </div>
        </TabsContent>

        {/* Add Category */}
        <TabsContent value="add-category" className="space-y-3 mt-5">
          <Input
            placeholder="Tên danh mục"
            value={newCategoryName}
            onChange={(e) => setNewCategoryName(e.target.value)}
          />
          <Input
            className="space-y-3"
            type="file"
            accept="image/*"
            onChange={(e) => setImageCategory(e.target.files?.[0] || null)}
          />
          <Button onClick={handleAddCategory}>Thêm danh mục</Button>
        </TabsContent>

        {/* Edit Category */}
        <TabsContent value="edit-category" className="space-y-3 mt-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <h3 className="font-semibold">Danh sách danh mục</h3>
              {categories.map((category) => (
                <div
                  key={category.id}
                  className={`p-3 border rounded cursor-pointer${
                    editingCategoryId === category.id ? "bg-gray-100" : ""
                  }`}
                  onClick={() => prepareEditCategory(category)}
                >
                  {category.name}
                </div>
              ))}
            </div>

            {editingCategoryId && (
              <div className="space-y-3 p-4 border rounded">
                <h3 className="font-semibold">Chỉnh sửa danh mục</h3>
                <Input
                  placeholder="Tên danh mục"
                  value={editCategoryName}
                  onChange={(e) => setEditCategoryName(e.target.value)}
                />
                {/* Upload Ảnh */}
                <div className="space-y-3 md:col-span-2">
                  <Label htmlFor="editImage">
                    Ảnh danh mục: <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="editImageCategory"
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      if (e.target.files && e.target.files[0]) {
                        setEditCategoryImage(e.target.files[0]);
                      }
                    }}
                  />
                </div>
                <Button onClick={handleEditCategory}>Cập nhật danh mục</Button>
              </div>
            )}
          </div>
        </TabsContent>

        {/* Delete Category */}
        <TabsContent value="delete-category" className="space-y-3 mt-5">
          <div className="space-y-2">
            {categories.map((category) => (
              <div
                key={category.id}
                className="flex justify-between items-center p-3 border rounded"
              >
                <div>{category.name}</div>
                <Button
                  variant="destructive"
                  onClick={() => handleDeleteCategory(category.id)}
                >
                  Xóa
                </Button>
              </div>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
